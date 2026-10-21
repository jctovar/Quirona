-- ============================================================================
-- 20261021130200_allow_sql_role_updates.sql
--
-- Ajuste sobre prevent_profile_role_change():
--   La versión inicial bloqueaba también los cambios de rol hechos por el
--   equipo desde el SQL Editor o por mantenimiento directo en la base
--   (esas sesiones no tienen JWT y por tanto no traen claim de rol).
--
--   Ahora solo se bloquea cuando existe una sesión de PostgREST (auth.uid()
--   no nulo) y quien llama no es service_role ni admin.
-- ============================================================================

begin;

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
     and auth.uid() is not null            -- hay sesión de PostgREST
     and caller_role <> 'service_role'
     and app_role <> 'admin' then
    raise exception 'No autorizado para cambiar el rol del perfil'
      using errcode = '42501';
  end if;
  return new;
end;
$$;

revoke all on function public.prevent_profile_role_change() from public, anon, authenticated;

commit;
