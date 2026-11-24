import Image from "next/image";
import Link from "next/link";
import { Dividir } from "@/components/dividir";

/**
 * Marcas de herrajes que usa el taller: logos en sus colores originales (public/marcas),
 * sueltos sobre el fondo y en movimiento continuo. La altura se ajusta por logo para que
 * pesen parecido. Con "reducir movimiento" la tira queda quieta y centrada.
 */
export const marcas = [
  { nombre: "Blum", archivo: "blum", ancho: 321, alto: 160, h: 52 },
  { nombre: "Häfele", archivo: "hafele", ancho: 970, alto: 160, h: 30 },
  { nombre: "Hettich", archivo: "hettich", ancho: 257, alto: 160, h: 64 },
  { nombre: "Salice", archivo: "salice", ancho: 954, alto: 160, h: 30 },
  { nombre: "Ducasse", archivo: "ducasse", ancho: 734, alto: 160, h: 42 },
];

function Tira({ oculta = false }: { oculta?: boolean }) {
  return (
    <ul className="flex shrink-0 items-center gap-20 pr-20 sm:gap-32 sm:pr-32" aria-hidden={oculta || undefined}>
      {marcas.map((m) => (
        <li key={m.nombre} className="flex h-20 shrink-0 items-center">
          <Image
            src={`/marcas/${m.archivo}.png`}
            alt={oculta ? "" : m.nombre}
            width={Math.round((m.ancho / m.alto) * m.h)}
            height={m.h}
          />
        </li>
      ))}
    </ul>
  );
}

/** Tira de logos en color, en movimiento. Se pausa al pasar el mouse. */
export function TiraMarcas() {
  return (
    <div className="marquesina relative overflow-hidden">
      <div className="marquesina-pista flex w-max">
        <Tira />
        <Tira oculta />
      </div>
    </div>
  );
}

/** Sección de la portada: título grande, tira de marcas y un texto con filete. */
export function MarcasHerrajes() {
  return (
    <section aria-labelledby="marcas-titulo" className="py-16 sm:py-24">
      <div className="mx-auto w-full max-w-6xl px-6">
        <h2
          id="marcas-titulo"
          data-revelar
          className="frase max-w-3xl"
        >
          <Dividir texto="Utilizamos herrajes de marcas reconocidas en todo el mundo." />
        </h2>
      </div>

      <div className="my-12 sm:my-16">
        <TiraMarcas />
      </div>

      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 sm:grid-cols-2">
        <div data-revelar className="flex flex-col gap-4 border-l border-foreground pl-6 sm:pl-10">
          <p className="destacado max-w-md">
            Lo que no se ve también se elige. Bisagras, correderas y elevables que se abren y cierran todos los días.
          </p>
          <span className="cuerpo-chico text-muted">Blum · Häfele · Hettich · Salice · Ducasse</span>
        </div>
        <div data-revelar className="flex flex-col items-start gap-3 sm:pt-1">
          <p className="cuerpo-chico max-w-sm text-muted">
            Los usamos en cocinas, placares y vanitorys: cierre suave, apertura por presión, correderas telescópicas y
            sistemas para alacenas.
          </p>
          <Link href="/materiales#herrajes" className="cuerpo-chico underline underline-offset-4">
            Ver los herrajes
          </Link>
        </div>
      </div>
    </section>
  );
}
