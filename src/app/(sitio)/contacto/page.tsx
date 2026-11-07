import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@heroui/react";
import { Encabezado } from "@/components/ui";
import { getSitio } from "@/lib/datos";
import { direccionTexto, mapsUrl, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Taller en Caseros, Buenos Aires. Cotizá tu proyecto o escribinos.",
};

export default async function ContactoPage() {
  const s = await getSitio();
  const wa = whatsappUrl(s.whatsapp, "Hola, quiero hacer una consulta.");
  const direccion = direccionTexto(s.direccion);
  const mapaEmbed = `https://www.google.com/maps?q=${encodeURIComponent(`${direccion}, Argentina`)}&output=embed`;

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
            <a href={mapsUrl(s.direccion)} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              {direccion}
            </a>
          </dd>
          <dt className="etiqueta pt-1 text-muted">Instagram</dt>
          <dd>
            <a href={s.instagram.url} target="_blank" rel="noopener noreferrer" className="underline underline-offset-4">
              {s.instagram.usuario}
            </a>
          </dd>
          {s.email && (
            <>
              <dt className="etiqueta pt-1 text-muted">Email</dt>
              <dd>
                <a href={`mailto:${s.email}`} className="underline underline-offset-4">
                  {s.email}
                </a>
              </dd>
            </>
          )}
        </dl>
      </div>
      <iframe
        title={`Mapa: ${direccion}`}
        src={mapaEmbed}
        className="aspect-[4/3] w-full border border-border"
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </section>
  );
}
