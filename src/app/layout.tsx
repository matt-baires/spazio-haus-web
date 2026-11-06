import type { Metadata } from "next";
import "@fontsource/cinzel/600.css";
import "@fontsource-variable/instrument-sans";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Spazio Haus · Estudio de mobiliario a medida",
    template: "%s | Spazio Haus",
  },
  description:
    "Diseño a medida, hecho en taller. Cocinas, racks, vanitorys, respaldos y muebles para cada espacio, diseñados y fabricados en nuestro taller de Caseros desde 2018.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className="h-full antialiased">
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
