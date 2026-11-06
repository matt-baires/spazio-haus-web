import { Card, Chip, Separator, buttonVariants } from "@heroui/react";

const proximamente = [
  {
    titulo: "Catálogo online",
    texto: "Muebles con ficha técnica, stock y plazo de entrega por variante.",
  },
  {
    titulo: "Estudio a medida",
    texto: "Cocinas, vestidores y proyectos integrales con fabricación propia.",
  },
  {
    titulo: "Showroom",
    texto: "Asesoramiento personalizado para elegir cada pieza.",
  },
];

export default function Home() {
  return (
    <main className="flex flex-1 flex-col bg-background text-foreground">
      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-8 px-6 py-24">
        <Chip variant="soft" color="accent" className="self-start">
          Sitio en construcción
        </Chip>
        <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
          Spazio Haus
        </h1>
        <p className="max-w-xl text-lg text-muted">
          Fábrica de mobiliario. Estamos construyendo nuestro nuevo sitio: muy
          pronto vas a poder recorrer el catálogo y comprar online.
        </p>
        <a
          href="#proximamente"
          className={buttonVariants({ variant: "primary", className: "self-start" })}
        >
          Qué se viene
        </a>
      </section>

      <Separator />

      <section id="proximamente" className="mx-auto w-full max-w-5xl px-6 py-16">
        <div className="grid gap-6 sm:grid-cols-3">
          {proximamente.map((item) => (
            <Card key={item.titulo}>
              <Card.Header>
                <Card.Title>{item.titulo}</Card.Title>
                <Card.Description>{item.texto}</Card.Description>
              </Card.Header>
            </Card>
          ))}
        </div>
      </section>

      <Separator />

      <footer className="mx-auto w-full max-w-5xl px-6 py-6 text-xs text-muted">
        © Spazio Haus
      </footer>
    </main>
  );
}
