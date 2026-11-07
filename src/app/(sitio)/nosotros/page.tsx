import type { Metadata } from "next";
import { CtaCotizar, Encabezado, FotoObra } from "@/components/ui";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Nosotros",
  description: `${site.descriptor} con taller propio en Caseros desde ${site.desde}.`,
};

const pilares = [
  {
    titulo: "Diseño",
    texto: "Cada pieza se piensa para un espacio y para quien la va a usar. No trabajamos con muebles de catálogo.",
    prueba: "Lo ves en: planos y propuestas antes de fabricar.",
  },
  {
    titulo: "Taller propio",
    texto: "Diseñamos y fabricamos en el mismo lugar. Así controlamos el proyecto del boceto al último canto.",
    prueba: "Lo ves en: el taller de Marco Polo 5379, Caseros.",
  },
  {
    titulo: "Detalle",
    texto: "Cantos, herrajes, encuentros y luz. Lo que no se nota cuando está bien hecho.",
    prueba: "Lo ves en: una foto de detalle por cada obra.",
  },
];

export default function NosotrosPage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-16 pt-14 sm:pt-20 lg:grid-cols-2">
        <Encabezado etiqueta="Nosotros" titulo={`Un estudio con taller, desde ${site.desde}`}>
          <p>
            {site.nombre} es un {site.descriptor.toLowerCase()} que diseña y fabrica en su propio taller, para quienes
            quieren un mueble pensado al milímetro y no uno de catálogo.
          </p>
        </Encabezado>
        <FotoObra etiqueta="Foto del taller" proporcion="aspect-[4/3]" />
      </section>

      <section className="bg-marfil">
        <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
          <p className="etiqueta mb-3 text-muted">Nuestra promesa</p>
          <h2 className="titulo mb-12">{site.tagline}</h2>
          <div className="grid gap-10 sm:grid-cols-3">
            {pilares.map((p) => (
              <div key={p.titulo} className="flex flex-col gap-3">
                <span className="h-px w-10 bg-dorado" aria-hidden="true" />
                <h3 className="text-lg font-semibold">{p.titulo}</h3>
                <p className="text-muted">{p.texto}</p>
                <p className="cuerpo-chico text-muted">{p.prueba}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 sm:py-24 lg:grid-cols-2">
        <div className="flex flex-col gap-4">
          <h2 className="titulo">Cómo trabajamos</h2>
          <ol className="flex flex-col gap-6">
            <li>
              <p className="font-semibold">1. Nos contás qué necesitás</p>
              <p className="text-muted">Con medidas aproximadas y fotos del espacio alcanza para empezar.</p>
            </li>
            <li>
              <p className="font-semibold">2. Lo diseñamos con vos</p>
              <p className="text-muted">Te proponemos el diseño, los materiales y el presupuesto.</p>
            </li>
            <li>
              <p className="font-semibold">3. Lo fabricamos en el taller</p>
              <p className="text-muted">Tomamos las medidas definitivas y fabricamos cada pieza.</p>
            </li>
            <li>
              <p className="font-semibold">4. Lo instalamos</p>
              <p className="text-muted">Cuidamos que cada encuentro quede como lo diseñamos.</p>
            </li>
          </ol>
        </div>
        <FotoObra etiqueta="Foto de detalle: cantos y herrajes" proporcion="aspect-[4/3]" />
      </section>

      <CtaCotizar />
    </>
  );
}
