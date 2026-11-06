import type { Metadata } from "next";
import { Accordion } from "@heroui/react";
import { CtaCotizar, Encabezado } from "@/components/ui";
import { faq } from "@/content/faq";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description: "Presupuestos, medidas, plazos y materiales de los muebles a medida de Spazio Haus.",
};

const faqLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map((f) => ({
    "@type": "Question",
    name: f.pregunta,
    acceptedAnswer: { "@type": "Answer", text: f.respuesta },
  })),
};

export default function FaqPage() {
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqLd) }} />
      <section className="mx-auto w-full max-w-3xl px-6 pb-20 pt-14 sm:pt-20">
        <Encabezado etiqueta="Ayuda" titulo="Preguntas frecuentes" />
        <Accordion className="mt-10">
          {faq.map((f, i) => (
            <Accordion.Item key={f.pregunta} id={`p${i}`}>
              <Accordion.Heading>
                <Accordion.Trigger>
                  {f.pregunta}
                  <Accordion.Indicator />
                </Accordion.Trigger>
              </Accordion.Heading>
              <Accordion.Panel>
                <Accordion.Body className="text-muted">{f.respuesta}</Accordion.Body>
              </Accordion.Panel>
            </Accordion.Item>
          ))}
        </Accordion>
      </section>
      <CtaCotizar titulo="¿No encontraste tu respuesta?" texto="Escribinos con tu consulta y te respondemos." />
    </>
  );
}
