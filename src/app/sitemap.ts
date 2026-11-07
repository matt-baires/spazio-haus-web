import type { MetadataRoute } from "next";
import { getArticulos, getObras, getServicios } from "@/lib/datos";
import { site } from "@/lib/site";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [servicios, obras, articulos] = await Promise.all([getServicios(), getObras(), getArticulos()]);
  const fijas = [
    "",
    "/obras",
    "/servicios",
    "/materiales",
    "/nosotros",
    "/profesionales",
    "/preguntas-frecuentes",
    "/contacto",
    "/cotizar",
    "/blog",
  ];
  return [
    ...fijas.map((p) => ({ url: `${site.url}${p}` })),
    ...servicios.map((s) => ({ url: `${site.url}/servicios/${s.slug}` })),
    ...obras.map((o) => ({ url: `${site.url}/obras/${o.slug}` })),
    ...articulos.map((a) => ({ url: `${site.url}/blog/${a.slug}` })),
  ];
}
