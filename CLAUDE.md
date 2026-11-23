@AGENTS.md

# Spazio Haus — sitio web

Sitio de **Spazio Haus**, estudio de mobiliario a medida con taller propio en Caseros, Buenos Aires (desde 2018). Hace cocinas, racks, vanitorys, respaldos y muebles a medida. El sitio muestra obras, servicios y materiales, y recibe pedidos de cotización.

- Producción: https://spaziohaus.vercel.app (panel en `/admin`)
- Repo: `matt-baires/spazio-haus-web`, rama `main`. Cada push a `main` despliega en Vercel (proyecto `spazio-haus-web`, equipo *matt-baires' projects*).
- Stack, estructura, scripts y variables de entorno: ver [README.md](README.md). No duplicar esa información acá.
- **PRD del sitio:** [PRD — Sitio e-commerce Spazio Haus](https://claude.ai/artifact/NaxmuFHpmVyfiHAafmaSKC). Define módulos (obras y servicios, cotización, tienda online, CMS), integraciones, métricas y el roadmap por fases (MVP, Fase 2, Fase 3). Consultarlo antes de sumar funcionalidades.

## Cómo trabajar en este repo

- Todo el contenido visible y el código propio se escribe **en español rioplatense** (nombres de archivos, variables de dominio, commits). Ej.: `src/lib/datos.ts`, `src/payload/revalidar.ts`, `obras`, `consultas`.
- Commits cortos en infinitivo y en español: "Agregar…", "Armar…", "Aplicar…".
- Next.js 16 y React 19 traen cambios grandes: antes de escribir código de Next, leer la guía en `node_modules/next/dist/docs/` (ver AGENTS.md).
- El contenido vive en **Payload CMS** (Postgres en Neon). Las páginas leen con `src/lib/datos.ts` (caché por etiquetas) y se invalidan desde `src/payload/revalidar.ts`. Si agregás una colección o campo: cambiarla en `src/payload/`, generar migración (`npm run payload -- migrate:create nombre`) y regenerar tipos (`npm run generate:types`).
- `src/content/` es solo contenido de ejemplo para la carga inicial (`npm run seed`); no es la fuente de verdad del sitio.
- `src/app/(payload)` son archivos generados por Payload: no editarlos a mano.
- Componentes de UI: HeroUI v3 + Tailwind v4. Los tokens de marca están en `src/app/globals.css`; usar esos tokens, no colores sueltos.
- Correr `npm run lint` antes de commitear.

## Marca (resumen del manual)

Fuente completa: [Manual de marca](https://claude.ai/artifact/3HdL6roE6ZJSzwuC44bnqf) · [Design system](https://claude.ai/artifact/HekLT3NuFkT7MRCkXcxV3P) · [Estrategia](https://claude.ai/artifact/HrENrt1Wzu5U8h6hqRjYYP) · [Identidad](https://claude.ai/artifact/6sJjM95bpLwMtCUhGjvwt6) · [Resumen de entregables](https://claude.ai/artifact/9o3rLuF1w7hvcT1TRdsWtK)

- **Posicionamiento:** estudio de mobiliario a medida con taller propio.
- **Tagline:** "Diseño a medida, hecho en taller."
- **Público:** familias y profesionales que arman o renuevan su casa y quieren muebles que se vean diseñados.
- **Pilares:** Diseño (prueba: portfolio de obras), Precisión (prueba: fotos de detalle), Acompañamiento (prueba: reseñas).
- **Nombre:** Spazio Haus, sin cambios. No usar nunca la marca anterior "Spazio Mio" ni su ícono de casa.

### Voz

Habla como quien diseñó y fabricó la pieza: precisa, sobria, cálida, confiable.

1. Mostrar antes que prometer: nombrar el material, la medida, la solución.
2. Una idea por oración.
3. Voseo y cercanía, sin diminutivos ni exclamaciones de relleno.
4. Sin superlativos vacíos: nada de "los mejores", "de tus sueños" ni "calidad premium".
5. Emojis solo funcionales (ubicación, contacto), nunca decorativos.

Así sí: "Cocina en madera con mesada negra. Diseñada y fabricada a medida." · Así no: "La cocina de tus sueños en nuestras manos."

### Visual

| Color | HEX | Uso |
| --- | --- | --- |
| Negro | `#141414` | Sello, texto principal |
| Dorado mate | `#B8955A` | Solo aros del sello y filetes finos. Nunca texto chico |
| Crema | `#F2EDE4` | Texto sobre negro |
| Blanco | `#FFFFFF` | Fondo principal |
| Marfil | `#F4F1EB` | Fondo de bloques |
| Piedra | `#D9D3C8` | Bordes y divisores |
| Gris texto | `#625D55` | Texto secundario, pies de foto |

- Proporción: ~70 % fondos claros, 20 % negro, ≤10 % dorado y piedra. Regla general: ante la duda, menos.
- Tipografías: **Cinzel** (600, +0,02 em) solo para el nombre y títulos cortos, nunca párrafos; **Instrument Sans** para todo lo demás. Etiquetas en mayúsculas con espaciado 0,18 em. Nada de letras manuscritas ni decorativas.
- Logo = el **sello** (círculo negro, doble aro dorado). Se usa tal cual: sin degradés, brillos ni sombras; sin deformar. Sello completo con bajada solo desde 120 px; en la web se usa la versión horizontal (`src/components/logo-horizontal.tsx`).
- Fotografía: solo obras terminadas, rectas, con luz natural, una general y al menos una de detalle. Nada de obras en proceso ni fotos torcidas u oscuras.

## Pendiente

- Cargar en el panel WhatsApp, email y obras reales con fotos; después destildar "contenido de ejemplo".
- Dominio propio (`src/lib/site.ts → url`).
- Emails automáticos por cada consulta (requiere proveedor de email).
- Sello original en alta resolución/vectorial (hoy mide 150 px) y confirmar la tipografía real del sello (Cinzel es una aproximación).
