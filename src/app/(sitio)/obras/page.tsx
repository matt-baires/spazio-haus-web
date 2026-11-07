import type { Metadata } from "next";
import { CtaCotizar, Encabezado } from "@/components/ui";
import { GaleriaObras } from "@/components/galeria-obras";
import { getObras, getServicios } from "@/lib/datos";

export const metadata: Metadata = {
  title: "Obras",
  description: "Cocinas, racks, vanitorys, respaldos y muebles a medida terminados, diseñados y fabricados en nuestro taller.",
};

export default async function ObrasPage() {
  const [obras, servicios] = await Promise.all([getObras(), getServicios()]);
  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 pb-10 pt-14 sm:pt-20">
        <Encabezado etiqueta="Obras terminadas" titulo="Lo que diseñamos y fabricamos">
          <p>Cada obra se pensó para un espacio. Filtrá por tipo de mueble.</p>
        </Encabezado>
      </section>
      <section className="mx-auto w-full max-w-6xl px-6 pb-20">
        {obras.length === 0 ? (
          <p className="text-muted">Pronto vas a ver acá nuestras obras terminadas.</p>
        ) : (
          <GaleriaObras obras={obras} tipos={servicios.map((s) => ({ slug: s.slug, nombre: s.nombre }))} />
        )}
      </section>
      <CtaCotizar titulo="¿Querés uno así?" />
    </>
  );
}
