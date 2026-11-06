import Link from "next/link";
import { buttonVariants } from "@heroui/react";

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-6xl flex-col items-start gap-6 px-6 py-24">
      <p className="etiqueta text-muted">Error 404</p>
      <h1 className="titulo">No encontramos esta página</h1>
      <p className="text-muted">Puede que se haya movido. Volvé al inicio o mirá nuestras obras.</p>
      <div className="flex gap-3">
        <Link href="/" className={buttonVariants({ variant: "primary" })}>
          Ir al inicio
        </Link>
        <Link href="/obras" className={buttonVariants({ variant: "outline" })}>
          Ver obras
        </Link>
      </div>
    </section>
  );
}
