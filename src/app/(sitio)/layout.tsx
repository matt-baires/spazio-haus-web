import type { Metadata } from "next";
import "@fontsource/cinzel/600.css";
import "@fontsource-variable/instrument-sans";
import "../globals.css";
import { Suspense } from "react";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AvisoEjemplo } from "@/components/aviso-ejemplo";
import { getSitio } from "@/lib/datos";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: "Spazio Haus · Estudio de mobiliario a medida",
    template: "%s | Spazio Haus",
  },
  description:
    "Diseño a medida, hecho en taller. Cocinas, racks, vanitorys, respaldos y muebles para cada espacio, diseñados y fabricados en nuestro taller de Caseros desde 2018.",
  openGraph: { siteName: site.nombre, locale: "es_AR", type: "website" },
};

async function DatosEstructurados() {
  const s = await getSitio();
  const datos = {
    "@context": "https://schema.org",
    "@type": "FurnitureStore",
    name: site.nombre,
    description: `${site.descriptor}. ${site.tagline}`,
    url: site.url,
    foundingDate: String(site.desde),
    email: s.email || undefined,
    telephone: s.whatsapp ? `+${s.whatsapp}` : undefined,
    address: {
      "@type": "PostalAddress",
      streetAddress: s.direccion.calle,
      addressLocality: s.direccion.localidad,
      addressRegion: s.direccion.provincia,
      postalCode: s.direccion.codigoPostal,
      addressCountry: "AR",
    },
    sameAs: [s.instagram.url],
  };
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(datos) }} />;
}

export default function SitioLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <Suspense>
          <DatosEstructurados />
          <AvisoEjemplo />
        </Suspense>
        <SiteHeader />
        <main className="flex flex-1 flex-col">{children}</main>
        <Suspense>
          <SiteFooter />
        </Suspense>
      </body>
    </html>
  );
}
