"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { buttonVariants } from "@heroui/react";
import { LogoHorizontal } from "@/components/logo-horizontal";
import { navegacionHeader } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);
  const [bajo, setBajo] = useState(false);
  const [sobreOscuro, setSobreOscuro] = useState(false);
  const cabecera = useRef<HTMLElement>(null);

  // Arriba de todo el menú es transparente; al bajar se vuelve translúcido con desenfoque.
  // Como en AYOCIN, las letras cambian según lo que pasa por debajo: oscuras sobre fondos
  // claros y claras sobre las secciones marcadas con data-menu="oscuro".
  useEffect(() => {
    let cuadro = 0;
    const revisar = () => {
      setBajo(window.scrollY > 8);
      const medio = (cabecera.current?.offsetHeight ?? 80) / 2;
      // Gana el bloque más interno: una tarjeta clara (data-menu="claro") dentro de una
      // sección oscura vuelve a poner las letras oscuras.
      let tema: string | undefined;
      document.querySelectorAll<HTMLElement>("[data-menu]").forEach((el) => {
        const caja = el.getBoundingClientRect();
        if (caja.top <= medio && caja.bottom >= medio) tema = el.dataset.menu;
      });
      setSobreOscuro(tema === "oscuro");
    };
    const alMover = () => {
      cancelAnimationFrame(cuadro);
      cuadro = requestAnimationFrame(revisar);
    };
    revisar();
    window.addEventListener("scroll", alMover, { passive: true });
    window.addEventListener("resize", alMover);
    return () => {
      cancelAnimationFrame(cuadro);
      window.removeEventListener("scroll", alMover);
      window.removeEventListener("resize", alMover);
    };
  }, [pathname]);
  const solido = bajo || abierto;
  const claro = sobreOscuro && !abierto;

  const activo = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header
      ref={cabecera}
      className={`sticky top-0 z-50 transition-colors duration-500 ${abierto ? "bg-background" : ""} ${
        claro ? "text-hueso" : "text-foreground"
      }`}
    >
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
        className={`pointer-events-none absolute inset-x-0 bottom-0 h-px origin-left bg-current opacity-20 transition-transform duration-700 ease-out ${
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
              className={`cuerpo-chico transition-colors duration-500 ${
                activo(item.href)
                  ? "underline underline-offset-8"
                  : claro
                    ? "text-hueso/70 hover:text-hueso"
                    : "text-muted hover:text-foreground"
              }`}
            >
              {item.label}
            </Link>
          ))}
          <Link
            href="/cotizar"
            className={buttonVariants({
              variant: "primary",
              size: "sm",
              className: `transition-colors duration-500 ${claro ? "bg-hueso text-foreground" : ""}`,
            })}
          >
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
            <span className="h-px w-full bg-current" />
            <span className="h-px w-full bg-current" />
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
