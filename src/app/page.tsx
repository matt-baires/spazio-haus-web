import { Card, Separator, buttonVariants } from "@heroui/react";
import { LogoHorizontal } from "@/components/logo-horizontal";

const INSTAGRAM = "https://www.instagram.com/spaziohaus.arg/";

const queHacemos = [
  { titulo: "Cocinas", texto: "Pensadas para cómo cocinás y para el espacio que tenés." },
  { titulo: "Racks", texto: "A la medida de la pared, la pantalla y lo que guardás." },
  { titulo: "Vanitorys", texto: "Para baños donde cada centímetro cuenta." },
  { titulo: "Respaldos", texto: "Del ancho exacto de la cama y del cuarto." },
  { titulo: "Muebles a medida", texto: "Si tu espacio lo necesita, lo diseñamos." },
];

const comoTrabajamos = [
  { paso: "01", titulo: "Diseño", texto: "Pensamos cada pieza para tu espacio, con vos." },
  { paso: "02", titulo: "Taller", texto: "La fabricamos en nuestro taller de Caseros." },
  { paso: "03", titulo: "Detalle", texto: "Cuidamos cada canto, herraje y terminación." },
];

export default function Home() {
  return (
    <>
      <header className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-8">
        <LogoHorizontal />
        <a
          href={INSTAGRAM}
          target="_blank"
          rel="noopener noreferrer"
          className="cuerpo-chico text-muted underline-offset-4 hover:text-foreground hover:underline"
        >
          Instagram
        </a>
      </header>

      <main className="flex flex-1 flex-col">
        <section className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 pb-24 pt-16 sm:pt-24">
          <p className="etiqueta text-muted">Estudio de mobiliario a medida</p>
          <h1 className="titulo-grande max-w-3xl text-[36px] leading-[44px] sm:text-[48px] sm:leading-[56px]">
            Diseño a medida, hecho en taller.
          </h1>
          <p className="max-w-xl text-muted">
            Lo diseñamos con vos. Lo fabricamos en nuestro taller de Caseros, desde 2018.
          </p>
          <div className="flex flex-wrap gap-3 pt-2">
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "primary", size: "lg" })}
            >
              Cotizá tu proyecto
            </a>
            <a href="#que-hacemos" className={buttonVariants({ variant: "outline", size: "lg" })}>
              Qué hacemos
            </a>
          </div>
        </section>

        <section id="que-hacemos" className="bg-marfil">
          <div className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
            <h2 className="titulo mb-10">Qué hacemos</h2>
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {queHacemos.map((item) => (
                <Card key={item.titulo} className="bg-background">
                  <Card.Header>
                    <Card.Title className="text-lg">{item.titulo}</Card.Title>
                    <Card.Description className="text-muted">{item.texto}</Card.Description>
                  </Card.Header>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-auto w-full max-w-6xl px-6 py-16 sm:py-24">
          <h2 className="titulo mb-10">Cómo trabajamos</h2>
          <ol className="grid gap-10 sm:grid-cols-3">
            {comoTrabajamos.map((item) => (
              <li key={item.paso} className="flex flex-col gap-3">
                <span className="etiqueta text-muted">{item.paso}</span>
                <span className="h-px w-10 bg-dorado" aria-hidden="true" />
                <h3 className="text-lg font-semibold">{item.titulo}</h3>
                <p className="text-muted">{item.texto}</p>
              </li>
            ))}
          </ol>
        </section>

        <section className="bg-marfil">
          <div className="mx-auto flex w-full max-w-6xl flex-col items-start gap-4 px-6 py-16 sm:py-24">
            <h2 className="titulo">Obras</h2>
            <p className="max-w-xl text-muted">
              Estamos preparando la galería de obras terminadas. Mientras tanto, las vas a encontrar
              en nuestro Instagram.
            </p>
            <a
              href={INSTAGRAM}
              target="_blank"
              rel="noopener noreferrer"
              className={buttonVariants({ variant: "outline" })}
            >
              Ver obras en Instagram
            </a>
          </div>
        </section>
      </main>

      <Separator />

      <footer className="mx-auto flex w-full max-w-6xl flex-col gap-6 px-6 py-10 sm:flex-row sm:items-end sm:justify-between">
        <LogoHorizontal compacto />
        <div className="cuerpo-chico flex flex-col gap-1 text-muted sm:items-end">
          <span>Marco Polo 5379, Caseros, Buenos Aires</span>
          <a href={INSTAGRAM} target="_blank" rel="noopener noreferrer" className="hover:text-foreground">
            @spaziohaus.arg
          </a>
          <span>© Spazio Haus</span>
        </div>
      </footer>
    </>
  );
}
