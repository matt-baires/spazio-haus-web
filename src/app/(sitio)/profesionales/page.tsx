import type { Metadata } from "next";
import Link from "next/link";
import { buttonVariants } from "@heroui/react";
import { Encabezado, FotoObra } from "@/components/ui";

export const metadata: Metadata = {
  title: "Profesionales",
  description: "Fabricamos el mobiliario de tus proyectos respetando el plano, los materiales y los plazos.",
};

const compromisos = [
  { titulo: "Respetamos el plano", texto: "Fabricamos lo que diseñaste. Si algo no se puede, te lo decimos antes y proponemos alternativas." },
  { titulo: "Un interlocutor claro", texto: "Una sola persona sigue tu proyecto del presupuesto a la instalación." },
  { titulo: "Plazos por escrito", texto: "Te confirmamos el plazo con el presupuesto técnico." },
  { titulo: "Materiales sin cambios", texto: "Usamos los materiales y herrajes especificados. Cualquier cambio se acuerda antes." },
];

export default function ProfesionalesPage() {
  return (
    <>
      <section className="mx-auto grid w-full max-w-6xl items-center gap-12 px-6 pb-16 pt-14 sm:pt-20 lg:grid-cols-2">
        <Encabezado etiqueta="Para arquitectos e interioristas" titulo="Tu diseño, fabricado en nuestro taller">
          <p>Trabajamos con estudios y profesionales independientes que necesitan un taller confiable.</p>
        </Encabezado>
        <FotoObra etiqueta="Foto de obra para profesionales" proporcion="aspect-[4/3]" />
      </section>

      <section className="bg-marfil">
        <div className="mx-auto grid w-full max-w-6xl gap-8 px-6 py-16 sm:grid-cols-2">
          {compromisos.map((c) => (
            <div key={c.titulo} className="flex flex-col gap-2 border-t border-border pt-5">
              <h2 className="text-lg font-semibold">{c.titulo}</h2>
              <p className="text-muted">{c.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto flex w-full max-w-6xl flex-col items-start gap-5 px-6 py-16 sm:py-24">
        <h2 className="titulo">Mandanos tu proyecto</h2>
        <p className="max-w-xl text-muted">
          Adjuntá planos o renders y contanos plazos y materiales. Te respondemos con un presupuesto técnico.
        </p>
        <Link href="/cotizar?perfil=profesional" className={buttonVariants({ variant: "primary", size: "lg" })}>
          Enviar proyecto
        </Link>
      </section>
    </>
  );
}
