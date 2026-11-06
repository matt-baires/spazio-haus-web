/**
 * Datos del sitio. Lo marcado como PENDIENTE hay que completarlo con el cliente.
 */
export const site = {
  nombre: "Spazio Haus",
  descriptor: "Estudio de mobiliario a medida",
  bajada: "Muebles de diseño a medida",
  tagline: "Diseño a medida, hecho en taller.",
  desde: 2018,
  direccion: {
    calle: "Marco Polo 5379",
    localidad: "Caseros",
    provincia: "Buenos Aires",
    codigoPostal: "B1682",
    pais: "AR",
  },
  instagram: {
    usuario: "@spaziohaus.arg",
    url: "https://www.instagram.com/spaziohaus.arg/",
  },
  /** PENDIENTE: número de WhatsApp en formato internacional sin "+" (ej. 5491100000000). */
  whatsapp: null as string | null,
  /** PENDIENTE: email de contacto. */
  email: null as string | null,
  /** PENDIENTE: dominio definitivo. */
  url: "https://spazio-haus-web.vercel.app",
  /** Mientras haya contenido de ejemplo, el sitio muestra un aviso arriba. */
  contenidoDeEjemplo: true,
} as const;

export const direccionCompleta = `${site.direccion.calle}, ${site.direccion.localidad}, ${site.direccion.provincia}`;

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  `${site.direccion.calle}, ${site.direccion.localidad}, ${site.direccion.provincia}`,
)}`;

export function whatsappUrl(mensaje: string): string | null {
  if (!site.whatsapp) return null;
  return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(mensaje)}`;
}

export const navegacion = [
  { href: "/obras", label: "Obras" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/profesionales", label: "Profesionales" },
  { href: "/preguntas-frecuentes", label: "Preguntas" },
  { href: "/contacto", label: "Contacto" },
] as const;
