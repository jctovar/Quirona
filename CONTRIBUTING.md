# Contribuir a Quirona Empower Her

Gracias por tu interés en mejorar Quirona. Este documento describe cómo reportar problemas, proponer cambios y enviar contribuciones de forma consistente con el proyecto.

> **Antes de empezar:** este repositorio corresponde a una plataforma educativa que trata **datos personales sensibles de salud**. No publiques datos reales de participantes en issues, pull requests, capturas de pantalla ni pruebas.

---

## 📑 Tabla de contenidos

- [Código de conducta](#-código-de-conducta)
- [Formas de contribuir](#-formas-de-contribuir)
- [Reportar un error](#-reportar-un-error)
- [Proponer una mejora](#-proponer-una-mejora)
- [Configurar el entorno](#-configurar-el-entorno)
- [Flujo de trabajo con Git](#-flujo-de-trabajo-con-git)
- [Convención de commits](#-convención-de-commits)
- [Estándares de código](#-estándares-de-código)
- [Seguridad y privacidad](#-seguridad-y-privacidad)
- [Verificación antes de enviar](#-verificación-antes-de-enviar)
- [Pull requests](#-pull-requests)
- [Licencia de las contribuciones](#-licencia-de-las-contribuciones)
- [Contacto](#-contacto)

---

## 🤝 Código de conducta

- Trata con respeto a todas las personas, sin importar género, edad, identidad, origen o nivel técnico.
- Este proyecto aborda violencia ginecológica y obstétrica: usa un lenguaje cuidadoso, no revictimizante y libre de juicios.
- No se toleran comentarios discriminatorios, acoso ni divulgación de información personal.
- Las discusiones técnicas se centran en el código y en el bienestar de las usuarias.

---

## 🛠️ Formas de contribuir

- Reportar errores o comportamientos inesperados.
- Proponer mejoras de contenido, accesibilidad o experiencia de usuaria.
- Corregir errores, mejorar el rendimiento o la calidad del código.
- Mejorar la documentación.
- Revisar pull requests de otras personas.

---

## 🐛 Reportar un error

Abre un issue incluyendo:

1. **Descripción clara** del problema.
2. **Pasos para reproducirlo** (ruta, acción, resultado esperado y obtenido).
3. **Entorno**: sistema operativo, navegador, versión de Node y rama/commit.
4. **Capturas o logs** *sin datos personales* (anonimiza correos, nombres, CURP y respuestas).
5. **Impacto**: ¿bloquea el flujo de una usuaria? ¿afecta datos?

> Si el problema es de **seguridad**, no abras un issue público: consulta la sección [Seguridad y privacidad](#-seguridad-y-privacidad).

---

## 💡 Proponer una mejora

Abre un issue describiendo:

- El problema o necesidad (no solo la solución).
- A quién beneficia (usuarias, investigadoras, equipo de contenido).
- Alternativas consideradas.
- Si aplica, referencias o ejemplos visuales.

Para cambios grandes (nuevas rutas, cambios al modelo de datos, nuevas dependencias), espera la validación del equipo antes de implementar.

---

## ⚙️ Configurar el entorno

Sigue la guía del [README](./README.md#-puesta-en-marcha). En resumen:

```bash
git clone https://github.com/jctovar/Quirona.git
cd Quirona
npm install
cp .env.example .env      # completa tus credenciales de Supabase
npm run dev               # http://localhost:8080
```

Requisitos: **Node.js 20 LTS o superior** y **npm 9+**.

---

## 🌿 Flujo de trabajo con Git

1. Sincroniza tu copia:
   ```bash
   git fetch upstream
   git checkout main
   git merge upstream/main
   ```
2. Crea una rama descriptiva desde `main`:
   ```bash
   git checkout -b fix/calculo-progreso-modulo-3
   ```
3. Realiza cambios pequeños y enfocados.
4. Verifica antes de commitear (ver [Verificación](#-verificación-antes-de-enviar)).
5. Abre el pull request.

**Convención de ramas:**

| Prefijo | Uso |
|---|---|
| `feat/…` | Nueva funcionalidad |
| `fix/…` | Corrección de errores |
| `docs/…` | Documentación |
| `refactor/…` | Reestructuración sin cambio funcional |
| `chore/…` | Configuración, dependencias, tooling |
| `test/…` | Pruebas |

---

## 📝 Convención de commits

Se usa **Conventional Commits** con emoji, en presente e imperativo, con la primera línea en **72 caracteres o menos**:

```text
✨ feat: agregar validación de CURP en el registro
🐛 fix: corregir cálculo de progreso del módulo 3
📝 docs: documentar variables de entorno
🔒️ fix: restringir actualización de rol en perfiles
♻️ refactor: extraer lógica de progreso a un helper
```

Tipos más usados: `feat`, `fix`, `docs`, `style`, `refactor`, `perf`, `test`, `chore`, `ci`, `revert`.

---

## 🎨 Estándares de código

- **TypeScript** en componentes y lógica nueva; evita `any` sin justificación.
- **Componentes funcionales** y hooks; mantén la estructura de `src/pages`, `src/components` y `src/lib`.
- **UI**: reutiliza los componentes de `src/components/ui` (shadcn/ui + Radix) antes de crear nuevos.
- **Estilos**: Tailwind CSS con los tokens del tema (`text-primary`, `bg-muted`, etc.); no introduzcas colores hardcodeados.
- **Textos de interfaz en español**, con lenguaje inclusivo y claro.
- **Rutas**: usa `react-router-dom` y registra la vista en `src/App.tsx`.
- No dejes `console.log` de depuración ni código comentado sin explicación.
- Mantén la compatibilidad con el modo claro/oscuro cuando apliques estilos.

---

## 🔒 Seguridad y privacidad

Reglas obligatorias para cualquier contribución:

1. **Nunca** subas archivos `.env`, claves `service_role`, `sb_secret_...` ni tokens al repositorio.
2. El frontend usa **solo** la clave pública (`anon` / `publishable`). Cualquier operación privilegiada va en el servidor (funciones `SECURITY DEFINER` o Edge Functions).
3. **No desactives RLS** para probar; si necesitas datos de prueba, usa un proyecto de Supabase aparte.
4. No registres datos personales en logs, analíticas ni reportes de error.
5. No incluyas datos reales en fixtures, capturas o pruebas.
6. Valida y autoriza en el servidor: las comprobaciones del cliente son solo de UX.

**Reporte de vulnerabilidades:** envía un correo a **quirona@iztacala.unam.mx** con el detalle y pasos de reproducción. No abras un issue público. Da un plazo razonable para corregir antes de divulgarlo.

---

## ✅ Verificación antes de enviar

Ejecuta y corrige lo que aplique:

```bash
npm run lint      # ESLint
npm test          # pruebas unitarias e integración (Vitest)
npm run build     # build de producción
npx tsc --noEmit  # verificación de tipos
npm run test:e2e  # E2E con Playwright (requiere el build)
```

> Si tu cambio afecta un flujo crítico (registro, progreso, evaluación), añade o actualiza las pruebas en `src/**/*.test.ts(x)` o en `e2e/`. El CI ejecuta tipos, pruebas con cobertura, E2E y build en cada PR.

Checklist rápido:

- [ ] La app levanta y la ruta afectada funciona.
- [ ] `npm test` pasa sin fallos.
- [ ] `npm run test:e2e` pasa sin fallos (si tocaste rutas o flujos públicos).
- [ ] No hay errores nuevos de lint ni de tipos.
- [ ] El build de producción termina correctamente.
- [ ] No se agregaron secretos ni datos personales.
- [ ] Se actualizó la documentación si cambió el comportamiento.

---

## 🔀 Pull requests

1. Título claro y en el mismo formato que los commits.
2. Descripción con: **qué** cambia, **por qué**, **cómo probarlo** y **capturas** si es UI.
3. Referencia el issue relacionado (`Closes #12`).
4. Cambios pequeños: un PR = un objetivo.
5. No mezcles refactorizaciones masivas con correcciones funcionales.
6. Atiende los comentarios de revisión y mantén la rama actualizada.

El equipo puede pedir ajustes de contenido o de enfoque, especialmente en textos sensibles de los módulos.

---

## 📄 Licencia de las contribuciones

Al enviar una contribución aceptas que tu aportación se distribuya bajo la **GNU General Public License v3.0** (ver [`LICENSE`](./LICENSE)), conservando la autoría del proyecto.

> Nota: la licencia cubre el **código**. Los contenidos educativos, instrumentos psicométricos, imágenes y datos del estudio **no** se licencian automáticamente con GPL-3.0; su uso requiere autorización del equipo responsable.

---

## 📬 Contacto

- **Correo:** quirona@iztacala.unam.mx
- **Repositorio original:** [leyvaortiznazli/Quirona](https://github.com/leyvaortiznazli/Quirona)
- **Institución:** FES Iztacala, UNAM
