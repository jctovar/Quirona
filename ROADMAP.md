# Roadmap de fixes para producción — Quirona Empower Her

> Basado en el análisis del 28-sep-2026.
> Estado inicial: build ✅ · `tsc --noEmit` ✅ · lint ❌ (24 errores, 7 warnings) · bundle 1.2 MB (348 KB gzip) · sin tests ni CI.
> Estado actual (oct-2026): 42 pruebas Vitest + 4 E2E Playwright · CI en `.github/workflows/ci.yml` · lint sigue con 24 errores conocidos.

**Convenciones:** Prioridad `P0` bloqueante · `P1` importante · `P2` recomendado.
Esfuerzo: `S` < 2 h · `M` < 1 día · `L` 1–3 días. `AC` = criterio de aceptación.

---

## Fase 0 — Configuración base (día 1)

| # | Fix | Archivos | Pri | Esf | Criterio de aceptación |
|---|-----|----------|-----|-----|------------------------|
| 0.1 | Crear `.env.example` con `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY` y configurar las variables en el hosting (Netlify/Vercel) | `.env.example`, panel del hosting | **P0** | S | Build de producción con variables inyectadas; la app carga sin pantalla blanca |
| 0.2 | Validación temprana de env vars (fallar con mensaje claro en vez de `createClient(undefined)`) | `src/supabaseClient.js` | P1 | S | Sin credenciales, la app muestra error legible en consola, no crash silencioso |
| 0.3 | Unificar lockfile: eliminar `bun.lockb`, conservar `package-lock.json` (el README documenta npm) | `bun.lockb` | P1 | S | `npm ci` instala limpio en CI |
| 0.4 | Confirmar hosting destino y SPA fallback (`dist/_redirects` es de Netlify; si es Vercel/nginx, replicar regla) | `public/_redirects` / `vercel.json` | P1 | S | Recargar `/dashboard` no da 404 |

## Fase 1 — Seguridad (bloqueante, días 1–3)

| # | Fix | Archivos | Pri | Esf | Criterio de aceptación |
|---|-----|----------|-----|-----|------------------------|
| 1.1 | **Auditoría de RLS en Supabase**: habilitar RLS en todas las tablas (`profiles`, `user_progress`, respuestas de tests, buzón) y crear políticas `SELECT/INSERT/UPDATE` restringidas a `auth.uid() = id`. Para lecturas del investigador, política separada que valide `role = 'researcher'` (vía función `security definer` o claim en JWT). Datos sensibles de salud de adolescentes: considerar cifrado de columnas sensibles | SQL en Supabase | **P0** | M | Con sesión de usuaria A no es posible leer/escribir filas de usuaria B (probar en SQL Editor con `set role authenticated` o con dos cuentas reales) |
| 1.2 | **Route guard de investigador**: crear `<RequireResearcher>` que verifique sesión (`getUser()`) + `role === 'researcher'` y envuelva `/researcher/*` y `/researcher-dashboard` | `src/App.tsx`, nuevo `src/components/RequireResearcher.tsx`, `src/layouts/ResearcherLayout.tsx` (hoy renderiza `isAuthenticated` hardcodeado) | **P0** | S | `/researcher/perfilInvestigador` sin sesión redirige a `/login`; usuaria sin rol redirige a `/dashboard` |
| 1.3 | **Eliminar fuga de respuestas en consola**: quitar `console.log` con `shouldBeYes` (respuestas correctas del juego) | `src/pages/Module3Game.tsx:171,204` | **P0** | S | Ningún log expone respuestas correctas |
| 1.4 | Drop automático de `console.*` en build de producción (conservar `console.error` si se desea) | `vite.config.ts` (`esbuild: { drop: ['console','debugger'] }` en prod) | P1 | S | `grep -r "console.log" dist/assets/*.js` vacío |

## Fase 2 — Calidad y rendimiento (días 3–6)

| # | Fix | Archivos | Pri | Esf | Criterio de aceptación |
|---|-----|----------|-----|-----|------------------------|
| 2.1 | Corregir los 24 errores de ESLint: reemplazar `any` por tipos en tests/dashboards, `require()` → `import` en `tailwind.config.ts:94`, interfaces vacías en `ui/command.tsx` y `ui/textarea.tsx` | ~10 archivos en `src/pages/`, `tailwind.config.ts` | P1 | M | `npm run lint` → 0 errores |
| 2.2 | Eliminar código muerto: función fantasma `isAllTestsCompleted()` (lanza error) e imports comentados de páginas de investigador | `src/App.tsx:201-203` | P1 | S | `tsc --noEmit` sigue en 0; sin código comentado muerto en `App.tsx` |
| 2.3 | **Code splitting**: `React.lazy` + `Suspense` por rutas (dashboards con recharts, módulos como chunks), `manualChunks` para vendors pesados | `src/App.tsx`, `vite.config.ts` | P1 | M | Bundle inicial < 300 KB gzip; desaparece el warning de chunk > 500 KB |
| 2.4 | Optimizar assets: PNGs de líneas de ayuda (1–1.8 MB c/u) → WebP ~150 KB; video `bienvenidaQuirona.mp4` (4.5 MB) → Supabase Storage/CDN o recomprimir a 720p | `src/assets/*` | P1 | M | Total de assets < 3 MB; carga aceptable en 3G |
| 2.5 | Preload del video con `poster` y carga diferida en la landing | `src/pages/Index.tsx` | P2 | S | LCP de landing no bloqueado por el video |

## Fase 3 — UX, legal y SEO (días 6–9)

| # | Fix | Archivos | Pri | Esf | Criterio de aceptación |
|---|-----|----------|-----|-----|------------------------|
| 3.1 | SEO/i18n: `lang="es"`, Open Graph + Twitter card, favicon, canonical, title/description por ruta | `index.html` | P1 | S | Vista previa correcta al compartir link; favicon visible |
| 3.2 | Legal/ética: verificar el asentimiento informado existente (commit a7ff79c), añadir **aviso de privacidad** (LFPDPPP — datos de menores), checkbox de consentimiento en registro y acceso público a la política | `src/pages/Register.tsx`, nueva página `/privacidad` | **P0** ético | M | Ninguna usuaria envía datos sin consentimiento registrado; política accesible desde el footer |
| 3.3 | Error boundary global + feedback visible cuando falla el guardado de progreso (hoy solo `console.error` en ~20 páginas) | `src/App.tsx`, `src/lib/progressHelper.ts` | P1 | M | Fallos de red muestran toast con opción de reintento; ningún crash en pantalla blanca |
| 3.4 | Manejo de sesión expirada: si `getUser()` falla tras inactividad, redirigir a `/login` con mensaje | guard global o interceptor | P2 | S | Sin estados "fANTASMA" de sesión expirada |

## Fase 4 — Operación (días 9–12)

| # | Fix | Archivos | Pri | Esf | Criterio de aceptación |
|---|-----|----------|-----|-----|------------------------|
| 4.1 | CI/CD con GitHub Actions: lint + `tsc --noEmit` + build en cada PR; deploy automático al merge | `.github/workflows/ci.yml` | P1 | M | PR sin build verde no se puede merge — ✅ CI base implementada; falta deploy automático |
| 4.2 | Monitoreo de errores (Sentry o similar) + filtro de datos sensibles en los eventos | `main.tsx` | P2 | M | Errores de producción visibles en el panel con stack trace |
| 4.3 | Tests E2E de flujos críticos: registro → login → test inicial → progreso de módulo 1 → cierre | Playwright | P2 | L | Suite corre en CI; detecta regresiones de progreso — ✅ smoke de páginas públicas; falta flujo autenticado |
| 4.4 | Versionado y release: `1.0.0-rc.1`, changelog, smoke test manual documentado | `package.json` | P1 | S | Tag de release en el repo |

---

## Orden recomendado y dependencias

```
0.1 env vars ──┬──> 1.1 RLS ──> 1.2 guard ──> smoke test auth
0.3 lockfile ──┤
0.4 hosting ───┘
1.3/1.4 console ── independiente (paralelo)
2.1 lint ──> 4.1 CI (CI exige lint verde)
2.3 code-split ──> 2.4 assets ──> medición final
3.2 legal ── bloqueante ético para pilotaje con participantes
```

Paralelizables desde el día 1: **1.1 (backend/SQL)** con **1.2–1.4 (frontend)**.

## Checklist de lanzamiento

- [ ] `.env` configurado en hosting y `.env.example` en el repo
- [ ] RLS verificado con prueba de acceso cruzado entre cuentas
- [ ] Guard de rutas de investigador activo
- [ ] 0 `console.log` con datos sensibles en `dist/`
- [ ] `npm run lint` y `tsc --noEmit` en 0 errores
- [ ] Bundle inicial < 300 KB gzip · assets < 3 MB
- [ ] Recarga directa de rutas sin 404
- [ ] Aviso de privacidad + consentimiento antes de recolectar datos
- [ ] Error boundary + monitoreo activo
- [ ] Smoke test manual: registro → login → test → módulo 1 → cierre
