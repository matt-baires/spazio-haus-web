import type { Metadata } from "next";
import { Suspense } from "react";
import { CotizarForm } from "@/components/cotizar-form";
import { Encabezado } from "@/components/ui";
import { servicios } from "@/content/servicios";
import { site, whatsappUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cotizá tu proyecto",
  description: "Contanos qué necesitás, con medidas aproximadas y fotos. Te respondemos con el diseño y el presupuesto.",
};

export default function CotizarPage() {
  const wa = whatsappUrl("Hola, quiero cotizar un mueble a medida.");
  const tipos = servicios.map((s) => ({ id: s.slug, nombre: s.nombre }));

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-14 px-6 pb-24 pt-14 sm:pt-20 lg:grid-cols-[1fr_1.6fr]">
      <div className="flex flex-col gap-6 lg:sticky lg:top-8 lg:self-start">
        <Encabezado etiqueta="Cotización" titulo="Cotizá tu proyecto">
          <p>Con medidas aproximadas y fotos alcanza para empezar. Las medidas definitivas las tomamos nosotros.</p>
        </Encabezado>
        <ol className="cuerpo-chico flex flex-col gap-3 border-t border-border pt-6 text-muted">
          <li>1. Nos contás qué necesitás.</li>
          <li>2. Te contactamos para afinar el diseño.</li>
          <li>3. Te pasamos el presupuesto y el plazo.</li>
        </ol>
        <p className="cuerpo-chico text-muted">
          ¿Preferís escribir?{" "}
          <a
            href={wa ?? site.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-4"
          >
            {wa ? "WhatsApp" : `Instagram ${site.instagram.usuario}`}
          </a>
        </p>
      </div>
      <Suspense fallback={<p className="text-muted">Cargando formulario…</p>}>
        <CotizarForm tipos={tipos} />
      </Suspense>
    </section>
  );
}
