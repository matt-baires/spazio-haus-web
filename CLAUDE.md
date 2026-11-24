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
- **Tagline:** "Diseño a medida, hecho en taller propio."
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

Paleta acromática: blancos y gama de negros (decisión del cliente del 24/11/2026, referencia [Moffitt.Moffitt.](https://moffittmoffitt.com)). Reemplaza las franjas cálidas (marfil, champagne, travertino, nogal), que quedaban antiguas.

| Color | Token | HEX | Uso |
| --- | --- | --- | --- |
| Blanco | `blanco` / `background` | `#FFFFFF` | Fondo de la página y campos |
| Humo | `humo` | `#F5F5F5` | Paneles, tarjetas y secciones alternadas |
| Niebla | `niebla` | `#EBECEC` | Divisores finos y fondo de fotos pendientes |
| Ceniza | `ceniza` | `#D8D8DA` | Bordes de campos |
| Gris texto | `muted` | `#595B60` | Texto secundario (AA sobre blanco y humo) |
| Carbón | `carbon` | `#1C1C1C` | Secciones oscuras (Cómo trabajamos, llamado a cotizar, aviso) |
| Negro | `foreground` | `#141414` | Sello, texto principal, botón principal, franja de Instagram |
| Hueso | `hueso` | `#FFFFFF` | Texto sobre negro |
| Dorado mate | `dorado` | `#B8955A` | Único color: aros del sello y filetes finos. Nunca texto chico |

- Nada de fondos teñidos (beige, crema, pasteles): el color lo ponen las fotos.
- Proporción: ~70 % blancos, 20 % negros, ≤10 % dorado y grises. Regla general: ante la duda, menos.
- Tipografías: **Cinzel** (600, +0,02 em) solo para el nombre y títulos cortos, nunca párrafos; **Instrument Sans** para todo lo demás. Etiquetas en mayúsculas con espaciado 0,18 em. Nada de letras manuscritas ni decorativas.
- Escala tipográfica de seis tamaños, con utilidades en `globals.css`: `etiqueta` 12 · `cuerpo-chico` 14 · cuerpo 17 · `destacado` 22 · `titulo` 30 · `titulo-grande` / `frase` 48 (36 en celular). No usar tamaños sueltos (`text-lg`, `text-[32px]`…). `titulo` y `titulo-grande` van en Cinzel; `frase` es la versión en Instrument Sans para frases largas. Excepciones: el nombre en el logo y el texto gigante decorativo de la portada.
- Logo = el **sello** (círculo negro, doble aro dorado). Versión principal: el **sello dorado metalizado original** (`public/marca/sello-dorado.png`, decisión del cliente del 23/11/2026; reemplaza la regla del manual de dorado mate plano). En la web va junto al nombre (`src/components/logo-horizontal.tsx`), y también es el ícono del sitio y la imagen para compartir. Es una imagen de 1240 px: para imprimir, grabar o plotear usar los SVG planos de `marca/` (completo, reducido, un color y horizontal). No estirar, rotar ni deformar.
- Fotografía: solo obras terminadas, rectas, con luz natural, una general y al menos una de detalle. Nada de obras en proceso ni fotos torcidas u oscuras.

## Publicación

- Etapa demo: cada cambio se commitea y se sube directo a `main` (`git push origin main`), que publica en producción. Claude hace el push (autorizado por el dueño el 23/11/2026).
- Al salir de la demo: separar una rama de producción y otra de prueba (Vercel da una URL de vista previa por rama) y dejar de subir directo a `main`. Recordárselo al dueño.

## Pendiente

- Cargar en el panel WhatsApp, email y obras reales con fotos; después destildar "contenido de ejemplo".
- Dominio propio (`src/lib/site.ts → url`).
- Emails automáticos por cada consulta (requiere proveedor de email).
- Sello original en alta resolución/vectorial (hoy mide 150 px) y confirmar la tipografía real del sello (Cinzel es una aproximación).
