import type { MetadataRoute } from "next";
import { getObras, getServicios } from "@/lib/datos";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [servicios, obras] = await Promise.all([getServicios(), getObras()]);
  const fijas = [
    "",
    "/obras",
    "/servicios",
    "/materiales",
    "/nosotros",
    "/preguntas-frecuentes",
    "/contacto",
    "/cotizar",
  ];
  return [
    ...fijas.map((p) => ({ url: `${site.url}${p}` })),
    ...servicios.map((s) => ({ url: `${site.url}/servicios/${s.slug}` })),
    ...obras.map((o) => ({ url: `${site.url}/obras/${o.slug}` })),
  ];
}
