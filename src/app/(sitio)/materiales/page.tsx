import type { Metadata } from "next";
import Image from "next/image";
import { Dividir } from "@/components/dividir";
import { orden } from "@/components/flecha";
import { TiraMarcas } from "@/components/marcas-herrajes";
import { CtaCotizar, Encabezado, EtiquetaEjemplo } from "@/components/ui";
import { getMateriales, type Muestra } from "@/lib/datos";

export const metadata: Metadata = {
  title: "Materiales",
  description:
    "Melaminas, laqueados, maderas y herrajes Blum, Häfele, Hettich, Salice y Ducasse con los que fabricamos tus muebles a medida.",
};

const herrajes = [
  { nombre: "Bisagras con cierre suave", texto: "La puerta frena sola en el último tramo y cierra sin golpe." },
  { nombre: "Correderas telescópicas", texto: "El cajón sale completo y se ve hasta el fondo. También con cierre suave." },
  { nombre: "Apertura por presión", texto: "Para frentes sin tirador: el mueble se abre con un toque." },
  { nombre: "Elevables", texto: "Las puertas de alacena suben y quedan firmes a la altura que elijas." },
  { nombre: "Equipamiento interior", texto: "Barrales, canastos, cajones internos y organizadores para placares y cocinas." },
  { nombre: "Tiradores", texto: "Embutidos, de perfil o de manija, en metal o en madera." },
];

function Swatch({ muestra }: { muestra: Muestra }) {
  const veta =
    muestra.textura === "madera"
      ? "repeating-linear-gradient(100deg, rgba(0,0,0,0.06) 0 2px, transparent 2px 9px), repeating-linear-gradient(97deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 17px)"
      : undefined;
  return (
    <li className="flex flex-col gap-2">
      {muestra.foto ? (
        <div className="redondeado relative aspect-square w-full overflow-hidden border border-border">
          <Image src={muestra.foto.url} alt={muestra.foto.alt || muestra.nombre} fill sizes="(min-width: 640px) 20vw, 45vw" className="object-cover" />
        </div>
      ) : (
        <div
          role="img"
          aria-label={`Muestra de ${muestra.nombre}`}
          className="redondeado aspect-square w-full border border-border"
          style={{ backgroundColor: muestra.color, backgroundImage: veta }}
        />
      )}
      <span className="cuerpo-chico">{muestra.nombre}</span>
    </li>
  );
}

export default async function MaterialesPage() {
  const materiales = await getMateriales();
  const hayEjemplos = materiales.some((g) => g.ejemplo);

  return (
    <>
      <section className="mx-auto w-full max-w-6xl px-6 pb-10 pt-14 sm:pt-20">
        <Encabezado etiqueta="Muestrario" titulo="Herrajes, materiales y colores">
          <p>
            Los herrajes que usamos y las melaminas y laqueados disponibles. Te ayudamos a combinarlos con tu
            espacio.
          </p>
        </Encabezado>
        {hayEjemplos && (
          <p className="cuerpo-chico mt-6 flex items-center gap-2 text-muted">
            <EtiquetaEjemplo /> Colores de referencia. En el taller te mostramos las muestras reales.
          </p>
        )}
      </section>

      <section id="herrajes" className="scroll-mt-24 py-16 sm:py-20">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 lg:grid-cols-[1fr_1fr] lg:items-end">
          <div data-revelar className="flex flex-col gap-4">
            <span className="etiqueta text-muted">Herrajes</span>
            <h2 className="frase max-w-xl">
              <Dividir texto="Lo que no se ve también se elige." />
            </h2>
          </div>
          <p data-revelar className="max-w-md text-muted lg:justify-self-end">
            Usamos herrajes de marcas reconocidas en todo el mundo, en cocinas, placares, vanitorys y todo mueble con
            puertas o cajones.
          </p>
        </div>

        <div className="my-12 sm:my-16">
          <TiraMarcas />
        </div>

        <ul className="mx-auto grid w-full max-w-6xl gap-x-10 gap-y-8 px-6 sm:grid-cols-2 lg:grid-cols-3">
          {herrajes.map((h, i) => (
            <li key={h.nombre} data-revelar className="flex flex-col gap-2 border-t border-foreground pt-5" style={orden(i % 3)}>
              <span className="etiqueta text-muted">{String(i + 1).padStart(2, "0")}</span>
              <span className="destacado font-semibold">{h.nombre}</span>
              <span className="cuerpo-chico text-muted">{h.texto}</span>
            </li>
          ))}
        </ul>
      </section>

      {materiales.map((grupo, i) => (
        <section key={grupo.slug} id={grupo.slug} className={i % 2 === 0 ? "bg-humo" : ""}>
          <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-16 lg:grid-cols-[1fr_2fr]">
            <div className="flex flex-col gap-3">
              <span className="h-px w-10 bg-dorado" aria-hidden="true" />
              <h2 className="titulo">{grupo.nombre}</h2>
              <p className="text-muted">{grupo.descripcion}</p>
              <p className="cuerpo-chico">
                <span className="text-muted">Ideal para: </span>
                {grupo.ideal}
              </p>
            </div>
            <ul className="grid grid-cols-2 gap-5 sm:grid-cols-3">
              {grupo.muestras.map((m) => (
                <Swatch key={m.nombre} muestra={m} />
              ))}
            </ul>
          </div>
        </section>
      ))}

      <CtaCotizar
        titulo="¿Ya tenés una combinación en mente?"
        texto="Contanos qué materiales y colores te gustan en el formulario. Lo diseñamos con vos."
      />
    </>
  );
}
