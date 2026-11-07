# Spazio Haus — sitio web

Sitio de Spazio Haus, estudio de mobiliario a medida con taller propio en Caseros. Desarrollo propio, desplegado en Vercel.

- **Sitio:** https://spazio-haus-web.vercel.app
- **Panel de contenidos:** https://spazio-haus-web.vercel.app/admin

## Stack

- React 19 sobre Next.js 16 (App Router, Cache Components)
- [Payload CMS 3](https://payloadcms.com) dentro del mismo proyecto: panel en `/admin`, API en `/api`
- Base de datos Postgres en [Neon](https://neon.tech) (plan gratuito, conectada desde el Marketplace de Vercel)
- Vercel Blob privado para imágenes del CMS y adjuntos de las cotizaciones
- [HeroUI v3](https://heroui.com) + Tailwind CSS v4 para el sitio público, con los tokens del design system de Spazio Haus en `src/app/globals.css`

## Panel de contenidos (`/admin`)

| Sección | Qué se carga |
| --- | --- |
| Consultas | Pedidos de cotización del sitio: estado, notas internas y adjuntos (los adjuntos se abren desde cada consulta) |
| Obras | Obras terminadas con fotos, foto de detalle, tipo, ambiente, zona y materiales. Tienen borrador y publicación |
| Servicios | Cocinas, racks, vanitorys, respaldos, muebles a medida |
| Materiales | Muestrario: grupos (melaminas, laqueados, maderas) y sus muestras |
| Preguntas frecuentes | Preguntas y respuestas; "Mostrar en la home" elige las de la portada |
| Blog | Artículos con editor de texto. Tienen borrador y publicación |
| Imágenes | Biblioteca de fotos (con texto alternativo obligatorio) |
| Configuración → Datos del sitio | WhatsApp, email, Instagram, dirección del taller y el aviso de "contenido de ejemplo" |
| Configuración → Usuarios | Administradores y editores |

El primer ingreso a `/admin` pide crear el usuario administrador.

Cada cambio guardado en el panel se refleja en el sitio en la siguiente visita (caché por etiquetas en `src/lib/datos.ts`, invalidada desde `src/payload/revalidar.ts`).

## Desarrollo local

```bash
npm install
# .env con DATABASE_URL (un Postgres local) y PAYLOAD_SECRET
npm run payload -- migrate   # crea las tablas
npm run seed                 # carga el contenido de ejemplo si está vacío
npm run dev
```

## Scripts

| Script | Qué hace |
| --- | --- |
| `npm run build` | Migra la base, carga el contenido de ejemplo en colecciones vacías y compila Next.js (lo que corre Vercel) |
| `npm run payload -- migrate:create nombre` | Genera una migración después de cambiar colecciones en `src/payload/` |
| `npm run generate:types` / `generate:importmap` | Regenera tipos e import map de Payload |
| `npm run seed` | Carga inicial desde `src/content/` (no pisa lo existente) |

## Estructura

| Carpeta | Qué hay |
| --- | --- |
| `src/app/(sitio)` | Sitio público |
| `src/app/(payload)` | Panel y API de Payload (archivos generados) |
| `src/app/api/cotizar` | Recibe el formulario y crea la consulta |
| `src/app/api/adjunto` | Sirve adjuntos privados solo con sesión en el panel |
| `src/payload/` | Colecciones, datos del sitio, acceso, almacenamiento y carga inicial |
| `src/migrations/` | Migraciones de la base |
| `src/content/` | Contenido de ejemplo usado solo por la carga inicial |

## Variables de entorno (Vercel)

| Variable | Para qué |
| --- | --- |
| `SPAZIOH_DATABASE_URL` (y demás `SPAZIOH_*`) | Conexión a Neon, creadas por la integración |
| `PAYLOAD_SECRET` | Clave de Payload para firmar sesiones |
| `BLOB_READ_WRITE_TOKEN` | Store privado `spazio-haus-consultas` (imágenes y adjuntos) |

## Pendiente

- Completar en el panel: WhatsApp, email y obras reales con fotos; luego destildar "contenido de ejemplo"
- Dominio propio (`src/lib/site.ts → url`)
- Emails automáticos por cada consulta (requiere proveedor de email)
