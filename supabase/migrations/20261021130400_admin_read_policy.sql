-- ============================================================================
-- 20261021130400_admin_read_policy.sql
--
-- La política restrictiva solo acota el acceso; para que una cuenta admin
-- pueda leer todos los perfiles hace falta además una política PERMISSIVE.
-- Tras eliminar "Lectura global para usuarios autenticados", la única
-- permisiva de SELECT era "Investigadores_Leen_Todo" (propia o researcher),
-- de modo que las cuentas admin quedaban limitadas a su propia fila.
--
-- Se añade una permisiva específica para admin. La restrictiva de la
-- migración anterior sigue aplicando y exige ser admin o investigador.
-- ============================================================================

begin;

drop policy if exists profiles_admin_read_all on public.profiles;
create policy profiles_admin_read_all
  on public.profiles
  for select
  to authenticated
  using (public.is_admin_secure());

commit;
