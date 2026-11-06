import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@heroui/react";
import { Encabezado } from "@/components/ui";
import { direccionCompleta, mapsUrl, site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: `Taller en ${direccionCompleta}. Cotizá tu proyecto o escribinos.`,
};

const mapaEmbed = `https://www.google.com/maps?q=${encodeURIComponent(
  `${site.direccion.calle}, ${site.direccion.localidad}, ${site.direccion.provincia}, Argentina`,
)}&output=embed`;

export default function ContactoPage() {
  const wa = whatsappUrl("Hola, quiero hacer una consulta.");
  return (
    <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 pb-20 pt-14 sm:pt-20 lg:grid-cols-2">
      <div className="flex flex-col gap-8">
        <Encabezado etiqueta="Contacto" titulo="Hablemos de tu espacio">
          <p>La forma más rápida de empezar es el formulario de cotización.</p>
        </Encabezado>
        <div className="flex flex-wrap gap-3">
          <Link href="/cotizar" className={buttonVariants({ variant: "primary", size: "lg" })}>
            Cotizá tu proyecto
          </Link>
          {wa && (
            <a href={wa} target="_blank" rel="noopener noreferrer" className={buttonVariants({ variant: "outline", size: "lg" })}>
              WhatsApp
            </a>
          )}
        </div>
        <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 border-t border-border pt-6">
          <dt className="etiqueta pt-1 text-muted">Taller</dt>
          <dd>
            <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              {direccionCompleta}
            </a>
          </dd>
          <dt className="etiqueta pt-1 text-muted">Instagram</dt>
          <dd>
            <a href={site.instagram.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              {site.instagram.usuario}
            </a>
          </dd>
          {site.email && (
            <>
              <dt className="etiqueta pt-1 text-muted">Email</dt>
              <dd>
                <a href={`mailto:${site.email}`} className="underline underline-offset-4">
                  {site.email}
                </a>
              </dd>
            </>
          )}
        </dl>
      </div>
      <iframe
        title={`Mapa: ${direccionCompleta}`}
        src={mapaEmbed}
        className="aspect-[4/3] w-full border border-border"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}
