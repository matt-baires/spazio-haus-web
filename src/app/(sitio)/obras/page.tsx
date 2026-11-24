import type { Metadata } from "next";
import { CtaCotizar, Encabezado } from "@/components/ui";
import { GaleriaObras } from "@/components/galeria-obras";
import { getObras, getServicios } from "@/lib/datos";
import { fotoEjemploServicio, fotosEjemplo } from "@/lib/fotos-ejemplo";

export const metadata: Metadata = {
  title: "Obras",
  description: "Cocinas, racks, vanitorys, respaldos, vestidores y muebles a medida terminados, diseñados y fabricados en nuestro taller.",
};

export default async function ObrasPage() {
  const [obras, servicios] = await Promise.all([getObras(), getServicios()]);
  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 pb-14 pt-8 sm:pt-12">
        {obras.length === 0 ? (
          <p className="text-muted">Pronto vas a ver acá nuestras obras terminadas.</p>
        ) : (
          <GaleriaObras
            obras={obras}
            tipos={servicios.map((s) => ({ slug: s.slug, nombre: s.nombre, resumen: s.resumen }))}
            fotos={{
              todas: fotosEjemplo.cocinaMaderaMesadaNegra,
              ...Object.fromEntries(servicios.map((s) => [s.slug, s.imagen ?? fotoEjemploServicio(s.slug)])),
            }}
            encabezado={
              <Encabezado etiqueta="Obras terminadas" titulo="Lo que diseñamos y fabricamos">
                <p>Cada obra se pensó para un espacio. Elegí una categoría y después el tipo de mueble.</p>
              </Encabezado>
            }
          />
        )}
      </section>
      <CtaCotizar titulo="¿Querés uno así?" />
    </>
  );
}
