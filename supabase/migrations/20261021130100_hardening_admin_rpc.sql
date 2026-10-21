-- ============================================================================
-- 20261021130100_hardening_admin_rpc.sql
--
-- El RPC public.admin_create_researcher era ejecutable con la clave anon.
-- Hoy falla por una columna inexistente (`is_ss_admin`), pero al corregirse
-- permitiría a cualquiera con la clave pública crear cuentas de investigador.
--
-- También se retiran del rol anon los RPC de consulta de rol, que el cliente
-- no utiliza.
--
-- Si en el futuro el panel de investigación necesita crear investigadores,
-- debe hacerse desde una Edge Function con la service key, nunca desde el
-- navegador.
-- ============================================================================

begin;

do $$
declare
  r record;
begin
  -- RPC administrativo: solo accesible con service_role
  for r in
    select p.oid::regprocedure as signature
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname = 'admin_create_researcher'
  loop
    execute format('revoke execute on function %s from public', r.signature);
    execute format('revoke execute on function %s from anon', r.signature);
    execute format('revoke execute on function %s from authenticated', r.signature);
    execute format('grant execute on function %s to service_role', r.signature);
  end loop;

  -- Helpers de rol: no deben ser invocables sin sesión
  for r in
    select p.oid::regprocedure as signature
    from pg_proc p
    join pg_namespace n on n.oid = p.pronamespace
    where n.nspname = 'public'
      and p.proname in ('is_researcher', 'check_is_researcher', 'check_is_admin')
  loop
    execute format('revoke execute on function %s from anon', r.signature);
  end loop;
end $$;

commit;
