import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@heroui/react";
import { Dividir } from "@/components/dividir";
import { Encabezado } from "@/components/ui";
import { getPreguntas, getSitio } from "@/lib/datos";
import { direccionTexto, mapsUrl, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Taller en Caseros, Buenos Aires. Cotizá tu proyecto o escribinos.",
};

export default async function ContactoPage() {
  const [s, preguntas] = await Promise.all([getSitio(), getPreguntas()]);
  const destacadas = (
    preguntas.some((p) => p.enHome)
      ? preguntas.filter((p) => p.enHome)
      : preguntas
  ).slice(0, 3);
  const wa = whatsappUrl(s.whatsapp, "Hola, quiero hacer una consulta.");
  const direccion = direccionTexto(s.direccion);
  const mapaEmbed = `https://www.google.com/maps?q=${encodeURIComponent(`${direccion}, Argentina`)}&output=embed`;

  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl gap-12 px-6 pb-14 pt-8 sm:pt-12 lg:grid-cols-2">
        <div className="flex flex-col gap-8">
          <Encabezado etiqueta="Contacto" titulo="Hablemos de tu espacio">
            <p>
              La forma más rápida de empezar es el formulario de cotización.
            </p>
          </Encabezado>
          <div className="flex flex-wrap gap-3">
            <Link
              href="/cotizar"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Cotizá tu proyecto
            </Link>
            {wa && (
              <a
                href={wa}
                target="_blank"
                rel="noopener noreferrer"
                className={buttonVariants({ variant: "outline", size: "lg" })}
              >
                WhatsApp
              </a>
            )}
          </div>
          <dl className="grid grid-cols-[auto_1fr] gap-x-8 gap-y-4 border-t border-border pt-6">
            <dt className="etiqueta pt-1 text-muted">Taller</dt>
            <dd>
              <a
                href={mapsUrl(s.direccion)}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                {direccion}
              </a>
            </dd>
            <dt className="etiqueta pt-1 text-muted">Instagram</dt>
            <dd>
              <a
                href={s.instagram.url}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                {s.instagram.usuario}
              </a>
            </dd>
            {s.email && (
              <>
                <dt className="etiqueta pt-1 text-muted">Email</dt>
                <dd>
                  <a
                    href={`mailto:${s.email}`}
                    className="underline underline-offset-4"
                  >
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
          className="redondeado aspect-[4/3] w-full border border-border"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      </section>

      {destacadas.length > 0 && (
        <section className="bg-humo">
          <div className="mx-auto w-full max-w-6xl px-6 py-12 sm:py-16">
            <div data-revelar className="flex max-w-3xl flex-col gap-5">
              <h2 className="titulo">
                <Dividir texto="Preguntas frecuentes" />
              </h2>
              <dl className="flex flex-col divide-y divide-border border-y border-border">
                {destacadas.map((f) => (
                  <div key={f.pregunta} className="py-4">
                    <dt className="font-semibold">{f.pregunta}</dt>
                    <dd className="cuerpo-chico mt-1 text-muted">
                      {f.respuesta}
                    </dd>
                  </div>
                ))}
              </dl>
              <Link
                href="/preguntas-frecuentes"
                className="cuerpo-chico underline underline-offset-4"
              >
                Más preguntas
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
