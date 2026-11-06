import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Spazio Haus — Muebles de diseño",
    template: "%s | Spazio Haus",
  },
  description:
    "Spazio Haus: fábrica de mobiliario de diseño. Catálogo, proyectos a medida y showroom.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="es-AR" className="h-full antialiased">
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
