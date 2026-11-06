"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { buttonVariants } from "@heroui/react";
import { LogoHorizontal } from "@/components/logo-horizontal";
import { navegacion } from "@/lib/site";

export function SiteHeader() {
  const pathname = usePathname();
  const [abierto, setAbierto] = useState(false);

  const activo = (href: string) => pathname === href || pathname.startsWith(`${href}/`);

  return (
    <header className="border-b border-border bg-background">
      <div className="mx-auto flex w-full max-w-6xl items-center justify-between gap-6 px-6 py-5">
        <Link href="/" aria-label="Spazio Haus, ir al inicio" onClick={() => setAbierto(false)}>
          <LogoHorizontal compacto />
        </Link>

        <nav aria-label="Principal" className="hidden items-center gap-6 lg:flex">
          {navegacion.map((item) => (
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
            {navegacion.map((item) => (
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
