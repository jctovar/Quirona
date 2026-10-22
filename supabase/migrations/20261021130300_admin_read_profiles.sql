-- ============================================================================
-- 20261021130300_admin_read_profiles.sql
--
-- El proyecto usa tres roles en public.profiles: user, researcher y admin.
-- Las políticas restrictivas de la migración anterior solo contemplaban a
-- researcher, por lo que las cuentas admin (2 en producción) habrían perdido
-- la lectura global de perfiles que ya tenían por la política
-- "Admins can update/insert profiles".
--
-- Esta migración restituye el acceso de lectura para admin sin reabrir la
-- escalada: el rol solo puede asignarse por SQL o con service_role.
-- ============================================================================

begin;

create or replace function public.is_admin_secure()
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
      and role = 'admin'
  );
$$;

revoke all on function public.is_admin_secure() from public, anon;
grant execute on function public.is_admin_secure() to authenticated;

drop policy if exists profiles_select_own_or_researcher on public.profiles;
create policy profiles_select_own_or_researcher
  on public.profiles
  as restrictive
  for select
  to authenticated
  using (
    auth.uid() = id
    or public.is_researcher_secure()
    or public.is_admin_secure()
  );

drop policy if exists profiles_update_own on public.profiles;
create policy profiles_update_own
  on public.profiles
  as restrictive
  for update
  to authenticated
  using (auth.uid() = id or public.is_admin_secure())
  with check (auth.uid() = id or public.is_admin_secure());

commit;
