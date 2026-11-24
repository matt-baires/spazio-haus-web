import Link from "next/link";
import type { ReactNode } from "react";
import { FranjaInstagram } from "@/components/franja-instagram";
import { LogoHorizontal } from "@/components/logo-horizontal";
import { getSitio } from "@/lib/datos";
import { direccionTexto, mapsUrl, navegacion, site, whatsappUrl } from "@/lib/site";

/** 5491136765848 → +54 9 11 3676-5848 (si no tiene ese formato, lo deja como está). */
const telefonoLegible = (n: string) =>
  /^549\d{10}$/.test(n) ? `+54 9 ${n.slice(3, 5)} ${n.slice(5, 9)}-${n.slice(9)}` : n;

/** Encabezado de columna: mayúsculas al 40 % con un filete al 20 % que cruza la columna. */
function Columna({ titulo, className = "", children }: { titulo: string; className?: string; children: ReactNode }) {
  return (
    <div className={className}>
      <div className="etiqueta border-b border-hueso/20 px-6 pb-5 text-hueso/40">{titulo}</div>
      <div className="px-6 pb-12 pt-8 md:pb-24 md:pt-6">{children}</div>
    </div>
  );
}

/**
 * Pie al estilo de AYOCIN: fondo negro, columnas con encabezados en mayúsculas sobre un filete,
 * contacto en grande y una barra final con los datos legales. En pantallas medianas y grandes
 * queda fijo debajo del contenido, que se corre hacia arriba y lo descubre al llegar al final.
 */
export async function SiteFooter() {
  const s = await getSitio();
  const wa = whatsappUrl(s.whatsapp, "Hola, quiero hacer una consulta.");
  const enlace = "transition-opacity hover:opacity-60";

  return (
    <footer data-menu="oscuro" className="bg-foreground text-hueso md:sticky md:bottom-0 md:z-0">
      <div className="pt-14 md:pt-16">
        <div className="grid md:grid-cols-12">
          <Columna titulo="Taller" className="md:col-span-4">
            <div className="flex max-w-xs flex-col items-start gap-6">
              <LogoHorizontal compacto />
              <p className="cuerpo-chico text-hueso/70">
                {site.tagline} Desde {site.desde}.
              </p>
              <a href={mapsUrl(s.direccion)} target="_blank" rel="noopener noreferrer" className={`cuerpo-chico ${enlace}`}>
                {direccionTexto(s.direccion)}
              </a>
              <Link
                href="/cotizar"
                className="cuerpo-chico inline-flex w-full items-center justify-between rounded-full bg-hueso px-5 py-3 font-medium text-foreground transition-opacity hover:opacity-80"
              >
                Cotizá tu proyecto
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </Columna>

          <Columna titulo="Contacto" className="md:col-span-4">
            <ul className="flex flex-col gap-3">
              {wa && s.whatsapp && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className={`destacado ${enlace}`}>
                    WhatsApp {telefonoLegible(s.whatsapp)}
                  </a>
                </li>
              )}
              {s.email && (
                <li>
                  <a href={`mailto:${s.email}`} className={`destacado ${enlace}`}>
                    {s.email}
                  </a>
                </li>
              )}
              <li>
                <a href={s.instagram.url} target="_blank" rel="noopener noreferrer" className={`destacado ${enlace}`}>
                  {s.instagram.usuario}
                </a>
              </li>
            </ul>
          </Columna>

          <Columna titulo="Sitio" className="md:col-span-2">
            <nav aria-label="Pie de página">
              <ul className="cuerpo-chico flex flex-col gap-3">
                {[...navegacion, { href: "/materiales", label: "Materiales" }, { href: "/blog", label: "Blog" }].map((item) => (
                  <li key={item.href}>
                    <Link href={item.href} className={enlace}>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </Columna>

          <Columna titulo="Redes" className="md:col-span-2">
            <ul className="cuerpo-chico flex flex-col gap-3">
              <li>
                <a href={s.instagram.url} target="_blank" rel="noopener noreferrer" className={enlace}>
                  Instagram
                </a>
              </li>
              {wa && (
                <li>
                  <a href={wa} target="_blank" rel="noopener noreferrer" className={enlace}>
                    WhatsApp
                  </a>
                </li>
              )}
            </ul>
          </Columna>
        </div>

        <div className="etiqueta grid gap-y-3 border-t border-hueso/20 px-6 py-5 text-hueso/40 md:grid-cols-12">
          <span className="md:col-span-4">© {site.nombre}</span>
          <span className="md:col-span-4">
            <Link href="/legales/terminos" className="hover:text-hueso">
              Términos
            </Link>
            ,{" "}
            <Link href="/legales/privacidad" className="hover:text-hueso">
              Privacidad
            </Link>
          </span>
          <span className="md:col-span-4">Caseros, Buenos Aires</span>
        </div>
      </div>
      <FranjaInstagram usuario={s.instagram.usuario} url={s.instagram.url} />
    </footer>
  );
}
