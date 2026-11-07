import type { Metadata } from "next";
import "@fontsource/cinzel/600.css";
import "@fontsource-variable/instrument-sans";
import "./globals.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Página no encontrada · Spazio Haus",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <html lang="es-AR" className="h-full antialiased">
      <body className="flex min-h-full flex-col bg-background text-foreground">
        <section className="mx-auto flex w-full max-w-6xl flex-1 flex-col items-start justify-center gap-6 px-6 py-24">
          <p className="etiqueta text-muted">Error 404</p>
          <h1 className="titulo">No encontramos esta página</h1>
          <p className="text-muted">Puede que se haya movido. Volvé al inicio o mirá nuestras obras.</p>
          <div className="flex gap-3">
            <Link href="/" className="button button--primary">
              Ir al inicio
            </Link>
            <Link href="/obras" className="button button--outline">
              Ver obras
            </Link>
          </div>
        </section>
      </body>
    </html>
  );
}
