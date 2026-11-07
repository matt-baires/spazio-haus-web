import type { Metadata } from "next";
import Image from "next/image";
import { CtaCotizar, Encabezado, EtiquetaEjemplo } from "@/components/ui";
import { getMateriales, type Muestra } from "@/lib/datos";

export const metadata: Metadata = {
  title: "Materiales",
  description: "Melaminas, laqueados y maderas con los que diseñamos y fabricamos tus muebles a medida.",
};

function Swatch({ muestra }: { muestra: Muestra }) {
  const veta =
    muestra.textura === "madera"
      ? "repeating-linear-gradient(100deg, rgba(0,0,0,0.06) 0 2px, transparent 2px 9px), repeating-linear-gradient(97deg, rgba(255,255,255,0.08) 0 1px, transparent 1px 17px)"
      : undefined;
  return (
    <li className="flex flex-col gap-2">
      {muestra.foto ? (
        <div className="relative aspect-square w-full overflow-hidden border border-border">
          <Image src={muestra.foto.url} alt={muestra.foto.alt || muestra.nombre} fill sizes="(min-width: 640px) 20vw, 45vw" className="object-cover" />
        </div>
      ) : (
        <div
          role="img"
          aria-label={`Muestra de ${muestra.nombre}`}
          className="aspect-square w-full border border-border"
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
        <Encabezado etiqueta="Muestrario" titulo="Materiales y colores">
          <p>Melaminas y laqueados disponibles. Te ayudamos a combinarlos con tu espacio.</p>
        </Encabezado>
        {hayEjemplos && (
          <p className="cuerpo-chico mt-6 flex items-center gap-2 text-muted">
            <EtiquetaEjemplo /> Colores de referencia. En el taller te mostramos las muestras reales.
          </p>
        )}
      </section>

      {materiales.map((grupo, i) => (
        <section key={grupo.slug} id={grupo.slug} className={i % 2 === 0 ? "bg-marfil" : ""}>
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
