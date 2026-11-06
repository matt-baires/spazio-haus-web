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
    <main className="flex flex-1 flex-col">
      <section className="mx-auto flex w-full max-w-5xl flex-1 flex-col justify-center gap-8 px-6 py-24">
        <p className="text-sm uppercase tracking-[0.3em] text-foreground/60">
          Fábrica de mobiliario
        </p>
        <h1 className="text-5xl font-semibold tracking-tight sm:text-7xl">
          Spazio Haus
        </h1>
        <p className="max-w-xl text-lg text-foreground/70">
          Estamos construyendo nuestro nuevo sitio. Muy pronto vas a poder
          recorrer el catálogo y comprar online.
        </p>
      </section>

      <section className="border-t border-foreground/10">
        <div className="mx-auto grid w-full max-w-5xl gap-10 px-6 py-16 sm:grid-cols-3">
          {proximamente.map((item) => (
            <div key={item.titulo} className="flex flex-col gap-2">
              <h2 className="text-base font-semibold">{item.titulo}</h2>
              <p className="text-sm text-foreground/70">{item.texto}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="border-t border-foreground/10">
        <p className="mx-auto w-full max-w-5xl px-6 py-6 text-xs text-foreground/50">
          © Spazio Haus
        </p>
      </footer>
    </main>
  );
}
