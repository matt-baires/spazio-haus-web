# Spazio Haus — sitio web

Sitio de Spazio Haus, estudio de mobiliario a medida con taller propio en Caseros. Desarrollo propio, desplegado en Vercel.

**Producción:** https://spazio-haus-web.vercel.app

## Stack

- React 19 sobre Next.js 16 (App Router, Cache Components)
- [HeroUI v3](https://heroui.com) (React Aria + Tailwind CSS v4), sin Provider
- Tailwind CSS v4 y TypeScript
- Vercel Blob (privado) para guardar consultas y adjuntos

Los tokens del design system de Spazio Haus (paleta, Cinzel + Instrument Sans, radios) están en `src/app/globals.css` y se aplican sobre las variables de HeroUI.

## Desarrollo local

```bash
npm install
npm run dev
```

Para probar el formulario y la bandeja en local, traer las variables de Vercel (`vercel env pull`) o definir `BLOB_READ_WRITE_TOKEN` y `ADMIN_PASSWORD` en `.env.local`.

## Estructura

| Ruta | Qué es |
| --- | --- |
| `/` | Home |
| `/obras`, `/obras/[slug]` | Galería filtrable y ficha de obra |
| `/servicios`, `/servicios/[slug]` | Cocinas, racks, vanitorys, respaldos, muebles a medida |
| `/cotizar` | Formulario de cotización con adjuntos (acepta `?tipo=`, `?ref=`, `?perfil=profesional`) |
| `/nosotros`, `/profesionales`, `/preguntas-frecuentes`, `/contacto`, `/blog` | Páginas institucionales |
| `/legales/terminos`, `/legales/privacidad` | Borradores legales |
| `/admin` | Bandeja de consultas (usuario `admin`, contraseña en `ADMIN_PASSWORD`) |
| `/api/cotizar` | Recibe el formulario y guarda en Vercel Blob |

## Contenido

El contenido vive en archivos tipados, con la misma forma que tendrá en un CMS:

- `src/lib/site.ts`: datos del negocio. **Completar** `whatsapp`, `email` y `url` (dominio). Poner `contenidoDeEjemplo: false` cuando no quede contenido de ejemplo.
- `src/content/obras.ts`: obras. **Todas son de ejemplo** (`ejemplo: true`); reemplazar por obras reales.
- `src/content/servicios.ts`, `src/content/faq.ts`, `src/content/blog.ts`: textos de ejemplo para validar con el cliente.

Las fotos todavía son espacios reservados (`FotoPendiente`). Al tener fotos reales, guardarlas en `public/obras/` y reemplazar el componente por `next/image`.

## Variables de entorno (Vercel)

| Variable | Para qué |
| --- | --- |
| `BLOB_READ_WRITE_TOKEN` | Store `spazio-haus-consultas` (privado, región gru1). La crea Vercel al conectar el store. |
| `ADMIN_PASSWORD` | Contraseña de `/admin`. Se ve y se cambia en Vercel → Settings → Environment Variables. |

## Despliegue

Cada push a `main` publica en producción; cada rama genera una URL de vista previa.
