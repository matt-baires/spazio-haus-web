import type { Metadata } from "next";
import Link from "next/link";
import { LogoHorizontal } from "@/components/logo-horizontal";

export const metadata: Metadata = {
  title: "Bandeja de consultas",
  robots: { index: false, follow: false },
};

export default function AdminLayout({ children }: LayoutProps<"/admin">) {
  return (
    <div className="flex min-h-full flex-1 flex-col bg-marfil">
      <header className="border-b border-border bg-background">
        <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-6 py-4">
          <Link href="/admin" className="flex items-center gap-4">
            <LogoHorizontal compacto />
            <span className="etiqueta text-muted">Bandeja</span>
          </Link>
          <Link href="/" className="cuerpo-chico text-muted hover:text-foreground">
            Ver el sitio
          </Link>
        </div>
      </header>
      <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">{children}</main>
    </div>
  );
}
