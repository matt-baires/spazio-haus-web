import type { Metadata } from "next";
import { Encabezado } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = { title: "Términos y condiciones", robots: { index: false } };

export default function TerminosPage() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 pb-20 pt-14 sm:pt-20">
      <Encabezado etiqueta="Legales" titulo="Términos y condiciones">
        <p>Borrador de ejemplo. Debe revisarlo un asesor legal antes de publicarse como definitivo.</p>
      </Encabezado>
      <div className="mt-10 flex flex-col gap-6">
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Uso del sitio</h2>
          <p>
            Este sitio presenta los servicios de {site.nombre}. Las imágenes y descripciones de obras son ilustrativas y no
            constituyen una oferta. Cada proyecto se cotiza y se acuerda por escrito.
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Presupuestos</h2>
          <p>
            Los presupuestos se envían después de analizar cada consulta y tienen la vigencia que se indica en cada uno.
            Las medidas definitivas se toman antes de fabricar.
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Propiedad intelectual</h2>
          <p>Los textos, diseños e imágenes del sitio pertenecen a {site.nombre} o a sus autores.</p>
        </section>
      </div>
    </section>
  );
}
