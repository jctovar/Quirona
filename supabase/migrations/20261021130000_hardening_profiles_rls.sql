-- ============================================================================
-- 20261021130000_hardening_profiles_rls.sql
--
-- Cierra la escalada de privilegios detectada en public.profiles:
--   * Cualquier usuaria autenticada podía hacer PATCH /profiles y cambiar
--     su propio `role` a 'researcher'.
--   * Cualquier usuaria autenticada podía leer TODOS los perfiles.
--   * El rol `anon` podía insertar filas (solo la FK lo impedía).
--
-- Estrategia:
--   1. Revocar escrituras de `anon` y limitar `authenticated` a la única
--      columna que la app actualiza (`has_experience`).
--   2. Políticas RESTRICTIVE (se combinan con AND con las existentes, así que
--      no hace falta conocer ni borrar las políticas actuales).
--   3. Trigger que impide cambiar `role` salvo service_role / admin.
--
-- No se usa FORCE ROW LEVEL SECURITY a propósito: rompería los triggers
-- internos de auth que crean el perfil al registrarse.
-- ============================================================================

begin;

-- 1) RLS activo -------------------------------------------------------------
alter table public.profiles enable row level security;

-- 2) anon no puede leer ni escribir perfiles --------------------------------
revoke all on table public.profiles from anon;

-- 3) authenticated: solo puede actualizar has_experience --------------------
--    (la app no inserta ni borra perfiles desde el cliente; los crea el
--     trigger de auth.users)
revoke insert, update, delete on table public.profiles from authenticated;
revoke truncate, references, trigger on table public.profiles from authenticated;
revoke update (role) on table public.profiles from authenticated;  -- defensa por si hubiera grants de columna
grant update (has_experience) on table public.profiles to authenticated;

-- 3b) Eliminar las políticas permisivas que causaban la exposición ----------
--     "Lectura global..." permitía SELECT a cualquier autenticado.
--     "Permitir inserción total" permitía INSERT a cualquiera.
drop policy if exists "Lectura global para usuarios autenticados" on public.profiles;
drop policy if exists "Permitir inserción total" on public.profiles;

-- 4) Helper para políticas --------------------------------------------------
create or replace function public.is_researcher_secure()
returns boolean
language sql
stable
security definer
set search_path = public, pg_temp
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'researcher'
  );
$$;

revoke all on function public.is_researcher_secure() from public, anon;
grant execute on function public.is_researcher_secure() to authenticated;

-- 5) Políticas restrictivas -------------------------------------------------
drop policy if exists profiles_select_own_or_researcher on public.profiles;
create policy profiles_select_own_or_researcher
  on public.profiles
  as restrictive
  for select
  to authenticated
  using (
    auth.uid() = id
    or public.is_researcher_secure()
  );

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own
  on public.profiles
  as restrictive
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

-- 6) Trigger anti-cambio de rol --------------------------------------------
create or replace function public.prevent_profile_role_change()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  claims jsonb := coalesce(nullif(current_setting('request.jwt.claims', true), ''), '{}')::jsonb;
  caller_role text := coalesce(claims ->> 'role', '');
  app_role text := coalesce(claims -> 'app_metadata' ->> 'role', '');
begin
  if new.role is distinct from old.role
     and caller_role <> 'service_role'
     and app_role <> 'admin' then
    raise exception 'No autorizado para cambiar el rol del perfil'
      using errcode = '42501';
  end if;
  return new;
end;
$$;

revoke all on function public.prevent_profile_role_change() from public, anon, authenticated;

drop trigger if exists trg_prevent_profile_role_change on public.profiles;
create trigger trg_prevent_profile_role_change
  before update of role on public.profiles
  for each row
  execute function public.prevent_profile_role_change();

commit;
