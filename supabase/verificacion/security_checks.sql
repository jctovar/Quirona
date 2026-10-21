-- ============================================================================
-- Verificación de los parches de seguridad
-- Ejecutar en el SQL Editor de Supabase DESPUÉS de aplicar las migraciones.
-- ============================================================================

-- 1) RLS habilitado en profiles (relrowsecurity = true)
select
  relname,
  relrowsecurity   as rls_habilitado,
  relforcerowsecurity as rls_forzado
from pg_class
where oid = 'public.profiles'::regclass;

-- 2) Políticas de profiles
--    Debe existir la restrictiva profiles_select_own_or_researcher y
--    profiles_update_own. Las permisivas existentes pueden seguir ahí.
select
  polname                                   as politica,
  case polcmd
    when 'r' then 'SELECT'
    when 'a' then 'INSERT'
    when 'w' then 'UPDATE'
    when 'd' then 'DELETE'
    else polcmd::text
  end                                       as comando,
  case when polpermissive then 'PERMISSIVE' else 'RESTRICTIVE' end as tipo,
  pg_get_expr(polqual, polrelid)            as using_expr,
  pg_get_expr(polwithcheck, polrelid)       as check_expr
from pg_policy
where polrelid = 'public.profiles'::regclass
order by comando, tipo;

-- 3) Privilegios de tabla sobre profiles
--    anon no debe aparecer.
--    authenticated debe tener SELECT, pero NO INSERT/UPDATE/DELETE de tabla.
select
  grantee,
  privilege_type
from information_schema.role_table_grants
where table_schema = 'public'
  and table_name = 'profiles'
order by grantee, privilege_type;

-- 4) Privilegios de columna sobre profiles
--    authenticated solo debe poder actualizar has_experience.
select
  grantee,
  column_name,
  privilege_type
from information_schema.column_privileges
where table_schema = 'public'
  and table_name = 'profiles'
order by grantee, column_name, privilege_type;

-- 5) Trigger anti-cambio de rol
select
  tgname                    as trigger,
  pg_get_triggerdef(oid)    as definicion
from pg_trigger
where tgrelid = 'public.profiles'::regclass
  and not tgisinternal;

-- 6) Funciones de seguridad y sus permisos
select
  p.oid::regprocedure        as funcion,
  p.prosecdef                as security_definer,
  coalesce(p.proacl::text, '(default)') as permisos
from pg_proc p
join pg_namespace n on n.oid = p.pronamespace
where n.nspname = 'public'
  and p.proname in (
    'is_researcher_secure',
    'prevent_profile_role_change',
    'admin_create_researcher',
    'is_researcher',
    'check_is_researcher',
    'check_is_admin'
  )
order by 1;

-- 7) Comprobación de que la función auxiliar no es invocable por anon
--    Debe devolver false o error de permiso, nunca datos de otras personas.
select has_function_privilege('anon', 'public.is_researcher_secure()', 'EXECUTE') as anon_puede_ejecutar;
select has_function_privilege('anon', 'public.admin_create_researcher(text,text,text)', 'EXECUTE') as anon_puede_crear_investigador;

-- 8) Perfiles con rol inesperado (debe devolver 0 filas o solo roles válidos)
select role, count(*)
from public.profiles
group by role
order by role;
