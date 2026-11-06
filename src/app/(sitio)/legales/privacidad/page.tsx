import type { Metadata } from "next";
import { Encabezado } from "@/components/ui";
import { direccionCompleta, site } from "@/lib/site";

export const metadata: Metadata = { title: "Política de privacidad", robots: { index: false } };

export default function PrivacidadPage() {
  return (
    <section className="mx-auto w-full max-w-2xl px-6 pb-20 pt-14 sm:pt-20">
      <Encabezado etiqueta="Legales" titulo="Política de privacidad">
        <p>Borrador de ejemplo. Debe revisarlo un asesor legal antes de publicarse como definitivo.</p>
      </Encabezado>
      <div className="mt-10 flex flex-col gap-6">
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Qué datos pedimos</h2>
          <p>
            Cuando completás el formulario de cotización guardamos tu nombre, tus datos de contacto, la descripción del
            proyecto y los archivos que adjuntás. Solo los usamos para responder tu consulta y preparar el presupuesto.
          </p>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Con quién los compartimos</h2>
          <p>No vendemos ni cedemos tus datos. Se guardan en servicios de alojamiento contratados por {site.nombre}.</p>
        </section>
        <section className="flex flex-col gap-2">
          <h2 className="text-lg font-semibold">Tus derechos</h2>
          <p>
            Podés pedir acceso, rectificación o eliminación de tus datos en cualquier momento, escribiéndonos o en nuestro
            taller de {direccionCompleta}, según la Ley 25.326 de Protección de Datos Personales.
          </p>
        </section>
      </div>
    </section>
  );
}
