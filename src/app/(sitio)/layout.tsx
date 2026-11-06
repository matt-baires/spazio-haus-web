import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { AvisoEjemplo } from "@/components/ui";
import { site } from "@/lib/site";

const datosEstructurados = {
  "@context": "https://schema.org",
  "@type": "FurnitureStore",
  name: site.nombre,
  description: `${site.descriptor}. ${site.tagline}`,
  url: site.url,
  foundingDate: String(site.desde),
  address: {
    "@type": "PostalAddress",
    streetAddress: site.direccion.calle,
    addressLocality: site.direccion.localidad,
    addressRegion: site.direccion.provincia,
    postalCode: site.direccion.codigoPostal,
    addressCountry: site.direccion.pais,
  },
  sameAs: [site.instagram.url],
};

export default function SitioLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(datosEstructurados) }}
      />
      <AvisoEjemplo />
      <SiteHeader />
      <main className="flex flex-1 flex-col">{children}</main>
      <SiteFooter />
    </>
  );
}
