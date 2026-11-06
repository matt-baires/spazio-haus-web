# Spazio Haus — sitio web

Sitio e-commerce y de contenidos de Spazio Haus, fábrica de mobiliario. Desarrollo propio, desplegado en Vercel.

## Stack

- React 19 sobre Next.js 16 (App Router)
- [HeroUI v3](https://heroui.com) como librería de componentes (React Aria + Tailwind CSS v4), sin Provider
- Tailwind CSS v4 y TypeScript

Los estilos se importan en `src/app/globals.css` (primero Tailwind, después `@heroui/styles`). Los colores salen de los tokens de HeroUI (`bg-background`, `text-foreground`, `text-muted`, `bg-accent`…); la marca se personaliza sobrescribiendo sus variables CSS.

## Desarrollo local

```bash
npm install
npm run dev
```

Abrir http://localhost:3000.

## Despliegue

El repo está vinculado a Vercel: cada push a `main` publica en producción y cada rama genera una URL de vista previa.

## Alcance

Los requerimientos del producto (catálogo de venta, CMS, backoffice e integraciones) están en el PRD del proyecto: "PRD — Sitio e-commerce Spazio Haus".
