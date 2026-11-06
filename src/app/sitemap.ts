import type { MetadataRoute } from "next";
import { articulos } from "@/content/blog";
import { obras } from "@/content/obras";
import { servicios } from "@/content/servicios";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const fijas = ["", "/obras", "/servicios", "/nosotros", "/profesionales", "/preguntas-frecuentes", "/contacto", "/cotizar", "/blog"];
  return [
    ...fijas.map((p) => ({ url: `${site.url}${p}` })),
    ...servicios.map((s) => ({ url: `${site.url}/servicios/${s.slug}` })),
    ...obras.map((o) => ({ url: `${site.url}/obras/${o.slug}` })),
    ...articulos.map((a) => ({ url: `${site.url}/blog/${a.slug}` })),
  ];
}
