/**
 * Datos fijos de la marca. Lo editable (WhatsApp, email, Instagram, dirección,
 * aviso de ejemplo) vive en el panel: Configuración → Datos del sitio.
 */
export const site = {
  nombre: "Spazio Haus",
  descriptor: "Estudio de mobiliario a medida",
  bajada: "Muebles de diseño a medida",
  tagline: "Diseño a medida, hecho en taller.",
  desde: 2018,
  /** PENDIENTE: dominio definitivo. */
  url: "https://spazio-haus-web.vercel.app",
} as const;

export type Direccion = { calle: string; localidad: string; provincia: string };

export const direccionTexto = (d: Direccion) => `${d.calle}, ${d.localidad}, ${d.provincia}`;

export const mapsUrl = (d: Direccion) =>
  `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccionTexto(d))}`;

export function whatsappUrl(numero: string | null, mensaje: string): string | null {
  if (!numero) return null;
  return `https://wa.me/${numero}?text=${encodeURIComponent(mensaje)}`;
}

export const navegacion = [
  { href: "/obras", label: "Obras" },
  { href: "/servicios", label: "Servicios" },
  { href: "/nosotros", label: "Nosotros" },
  { href: "/profesionales", label: "Profesionales" },
  { href: "/preguntas-frecuentes", label: "Preguntas" },
  { href: "/contacto", label: "Contacto" },
] as const;
