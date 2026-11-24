import type { Metadata } from "next";
import { Dividir } from "@/components/dividir";
import { orden } from "@/components/flecha";
import { CtaCotizar } from "@/components/ui";
import { getPreguntas } from "@/lib/datos";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: "Presupuestos, medidas, plazos y materiales de los muebles a medida de Spazio Haus.",
};

/**
 * Preguntas frecuentes al estilo del FAQ de AYOCIN: un encabezado entre dos filetes y
 * cada pregunta en una fila de tres columnas (número, pregunta y respuesta), todas abiertas.
 */
export default async function FaqPage() {
  const faq = await getPreguntas();
  const faqLd = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.pregunta,
      acceptedAnswer: { "@type": "Answer", text: f.respuesta },
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <section className="mx-auto w-full max-w-6xl px-6 pb-20 pt-14 sm:pb-32 sm:pt-20">
        <div className="grid gap-y-2 border-y border-border py-8 sm:py-12 md:grid-cols-12 md:gap-x-6">
          <p className="frase text-muted md:col-span-4">
            <Dividir texto="Ayuda" alCargar />
          </p>
          <h1 className="frase md:col-span-8">
            <Dividir texto="Preguntas frecuentes" alCargar />
          </h1>
        </div>

        <ol>
          {faq.map((f, i) => (
            <li
              key={f.pregunta}
              data-revelar
              style={orden(i % 4)}
              className="grid gap-y-3 border-b border-border pb-10 pt-8 md:grid-cols-12 md:gap-x-6 md:pb-12 md:pt-6"
            >
              <span className="etiqueta text-muted md:col-span-4 md:pt-2">{String(i + 1).padStart(2, "0")}</span>
              <h2 className="destacado font-semibold md:col-span-5 md:pr-10">{f.pregunta}</h2>
              <p className="cuerpo-chico text-muted md:col-span-3 md:pt-1">{f.respuesta}</p>
            </li>
          ))}
        </ol>
      </section>
      <CtaCotizar titulo="¿No encontraste tu respuesta?" texto="Escribinos con tu consulta y te respondemos." />
    </>
  );
}
