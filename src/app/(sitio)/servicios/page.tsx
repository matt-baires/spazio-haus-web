import type { Metadata } from "next";
import Link from "next/link";
import { CtaCotizar, Encabezado, FotoObra } from "@/components/ui";
import { getServicios } from "@/lib/datos";

export const metadata: Metadata = {
  title: "Servicios",
  description: "Cocinas, racks, vanitorys, respaldos y muebles a medida, diseñados y fabricados en Caseros.",
};

export default async function ServiciosPage() {
  const servicios = await getServicios();
  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 pb-10 pt-14 sm:pt-20">
        <Encabezado etiqueta="Servicios" titulo="Muebles pensados para cada espacio">
          <p>Diseñamos y fabricamos en nuestro taller. Elegí por dónde empezar.</p>
        </Encabezado>
      </section>
      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 pb-20 sm:grid-cols-2">
        {servicios.map((s) => (
          <Link key={s.slug} href={`/servicios/${s.slug}`} className="group flex flex-col gap-4">
            <FotoObra foto={s.imagen} etiqueta={s.nombre} proporcion="aspect-[16/10]" sizes="(min-width: 640px) 50vw, 100vw" />
            <div className="flex flex-col gap-1">
              <h2 className="text-xl font-semibold group-hover:underline group-hover:underline-offset-4">{s.nombre}</h2>
              <p className="text-muted">{s.resumen}</p>
            </div>
          </Link>
        ))}
      </section>
      <CtaCotizar />
    </>
  );
}
