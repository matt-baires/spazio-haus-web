"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { buttonVariants } from "@heroui/react";
import { LogoHorizontal } from "@/components/logo-horizontal";
import { navegacionHeader } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [bajo, setBajo] = useState(false);

  // Arriba de todo el menú es transparente; al bajar se vuelve translúcido con desenfoque.
  useEffect(() => {
    const revisar = () => setBajo(window.scrollY > 8);
    revisar();
    window.addEventListener("scroll", revisar, { passive: true });
    return () => window.removeEventListener("scroll", revisar);
  }, []);
  const solido = bajo || abierto;

  const activo = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className={`sticky top-0 z-50 ${abierto ? "bg-background" : ""}`}>
      {/* Mismo efecto que AYOCIN: velo gris al 20 % con desenfoque de 8 px que aparece al bajar,
          y un filete al 20 % que se dibuja de izquierda a derecha. */}
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 bg-ceniza/20 backdrop-blur-[8px] transition-opacity duration-500 ${
          solido ? "opacity-100" : "opacity-0"
        }`}
      />
      <span
        aria-hidden="true"
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-foreground/20 transition-transform duration-700 ease-out ${
          solido ? "scale-x-100" : "scale-x-0"
        }`}
      />
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" aria-label="Spazio Haus, ir al inicio" onClick={() => setAbierto(false)}>
          <LogoHorizontal compacto />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-6 lg:flex">
          {navegacionHeader.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              aria-current={activo(item.href) ? "page" : undefined}
              className={`cuerpo-chico transition-colors hover:text-foreground ${
                activo(item.href) ? "text-foreground underline underline-offset-8" : "text-muted"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link href="/cotizar" className={buttonVariants({ variant: "primary", size: "sm" })}>
            Cotizá tu proyecto
          </Link>
        </nav>

        <button
          type="button"
          className="cuerpo-chico inline-flex items-center gap-2 lg:hidden"
          aria-expanded={abierto}
          aria-controls="menu-movil"
          onClick={() => setAbierto((v) => !v)}
        >
          <span aria-hidden="true" className="flex w-5 flex-col gap-1.5">
            <span className="h-px w-full bg-foreground" />
            <span className="h-px w-full bg-foreground" />
          </span>
          {abierto ? "Cerrar" : "Menú"}
        </button>
      </div>

      {abierto && (
        <nav id="menu-movil" aria-label="Principal" className="border-t border-border lg:hidden">
          <ul className="mx-auto flex w-full max-w-6xl flex-col px-6 py-4">
            {navegacionHeader.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setAbierto(false)}
                  aria-current={activo(item.href) ? "page" : undefined}
                  className="block py-3 text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li className="pt-3">
              <Link
                href="/cotizar"
                onClick={() => setAbierto(false)}
                className={buttonVariants({ variant: "primary", fullWidth: true })}
              >
                Cotizá tu proyecto
              </Link>
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}
