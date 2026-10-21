# Migraciones de Supabase

Este directorio contiene los cambios de base de datos del proyecto, incluidos los parches de seguridad.

> ⚠️ **Aplica las migraciones primero en un proyecto de staging.** Varias cambian permisos y políticas RLS; un error puede dejar sin acceso a las usuarias.

## Contenido

| Archivo | Descripción |
|---|---|
| `20261021130000_hardening_profiles_rls.sql` | Cierra la escalada de privilegios y la lectura masiva de `profiles`: revoca escrituras de `anon`, limita `authenticated` a `has_experience`, añade políticas restrictivas de SELECT/UPDATE y un trigger que impide cambiar `role` |
| `20261021130100_hardening_admin_rpc.sql` | Retira `admin_create_researcher` de `anon`/`authenticated` (solo `service_role`) y oculta los helpers de rol a `anon` |

## Antes de aplicar

1. **Respaldo**: Supabase Dashboard → *Database* → *Backups*, o `pg_dump` del esquema `public`.
2. Verifica que tienes acceso al **SQL Editor** o a la **CLI** de Supabase.
3. Revisa el SQL. Las migraciones son idempotentes en su mayoría, pero las políticas se recrean (`drop policy if exists` + `create policy`).

## Cómo aplicar

### Opción A — SQL Editor (rápida)

1. Abre el proyecto en [supabase.com/dashboard](https://supabase.com/dashboard).
2. *SQL Editor* → *New query*.
3. Pega el contenido de `20261021130000_hardening_profiles_rls.sql` y ejecuta.
4. Repite con `20261021130100_hardening_admin_rpc.sql`.
5. Ejecuta `verificacion/security_checks.sql` para confirmar el resultado.

### Opción B — Supabase CLI

```bash
supabase link --project-ref <project-ref>
supabase db push
```

## Verificación funcional

Con dos cuentas de prueba (una `user` y una `researcher`) comprueba:

| # | Prueba | Resultado esperado |
|---|---|---|
| 1 | `PATCH /rest/v1/profiles?id=eq.<propio_id>` con `{"role":"researcher"}` como usuaria | `401/403` con `42501` (no autorizado) |
| 2 | `GET /rest/v1/profiles?select=*` como usuaria | Solo su propia fila |
| 3 | `GET /rest/v1/profiles?select=*` como investigadora | Todas las filas |
| 4 | `GET /rest/v1/profiles?select=*` con la clave `anon` | `401` (permiso denegado) |
| 5 | `POST /rest/v1/rpc/admin_create_researcher` con la clave `anon` | `401/403` (permiso denegado) |
| 6 | Registro de una cuenta nueva | El trigger crea el perfil con `role = 'user'` |

Puedes ejecutar las consultas de `verificacion/security_checks.sql` en el SQL Editor para revisar políticas, privilegios y triggers.

## Si algo falla

| Síntoma | Causa probable | Solución |
|---|---|---|
| La app no carga el nombre de la usuaria | Se revocó SELECT de más | Revisar que exista una política permisiva de SELECT para `authenticated`; la restrictiva solo acota, no habilita |
| El registro no crea el perfil | Trigger de `auth.users` afectado | Confirmar que el trigger sea `SECURITY DEFINER`; no se usó `FORCE RLS` para evitarlo |
| Una investigadora no ve participantes | `is_researcher_secure()` devuelve `false` | Verificar que su fila en `profiles` tenga `role = 'researcher'` |
| `42501` al guardar la pregunta inicial | Falta el permiso de columna | La migración concede `update (has_experience)`; revisar que se aplicó completa |

## Rollback

Solo si es imprescindible y entendiendo que **reabre la vulnerabilidad**:

```sql
drop trigger if exists trg_prevent_profile_role_change on public.profiles;
drop function if exists public.prevent_profile_role_change();
drop policy if exists profiles_select_own_or_researcher on public.profiles;
drop policy if exists profiles_update_own on public.profiles;
drop function if exists public.is_researcher_secure();

grant insert, update, delete on public.profiles to authenticated;
grant all on public.profiles to anon;
```

## Notas de diseño

- Se usan políticas **RESTRICTIVE** para no depender de los nombres de las políticas existentes: se combinan con `AND`, así que solo pueden reducir el acceso.
- La autorización real vive en la base de datos. Las comprobaciones de rol en React (`Login.tsx`, `Dashboard.tsx`) son solo de experiencia de usuario.
- A medio plazo conviene mover el rol a `app_metadata` (solo modificable con la service key) y usar ese claim en las políticas, en lugar de `profiles.role`.
- `admin_create_researcher` sigue roto (referencia a `is_ss_admin`). Debe corregirse y moverse a una Edge Function con la service key.
