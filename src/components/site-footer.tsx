import Link from "next/link";
import { LogoHorizontal } from "@/components/logo-horizontal";
import { getSitio } from "@/lib/datos";
import { direccionTexto, mapsUrl, navegacion, site } from "@/lib/site";

export async function SiteFooter() {
  const s = await getSitio();
  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto grid w-full max-w-6xl gap-10 px-6 py-14 sm:grid-cols-3">
        <div className="flex flex-col gap-4">
          <LogoHorizontal />
          <p className="cuerpo-chico text-muted">{site.tagline}</p>
        </div>

        <nav aria-label="Pie de página" className="flex flex-col gap-2">
          <span className="etiqueta mb-2 text-muted">Sitio</span>
          {navegacion.map((item) => (
            <Link key={item.href} href={item.href} className="cuerpo-chico text-muted hover:text-foreground">
              {item.label}
            </Link>
          ))}
          <Link href="/materiales" className="cuerpo-chico text-muted hover:text-foreground">
            Materiales
          </Link>
          <Link href="/blog" className="cuerpo-chico text-muted hover:text-foreground">
            Blog
          </Link>
        </nav>

        <div className="flex flex-col gap-2">
          <span className="etiqueta mb-2 text-muted">Taller</span>
          <a href={mapsUrl(s.direccion)} target="_blank" rel="noopener noreferrer" className="cuerpo-chico text-muted hover:text-foreground">
            {direccionTexto(s.direccion)}
          </a>
          <a href={s.instagram.url} target="_blank" rel="noopener noreferrer" className="cuerpo-chico text-muted hover:text-foreground">
            Instagram {s.instagram.usuario}
          </a>
          {s.email && (
            <a href={`mailto:${s.email}`} className="cuerpo-chico text-muted hover:text-foreground">
              {s.email}
            </a>
          )}
          <Link href="/cotizar" className="cuerpo-chico text-foreground underline underline-offset-4">
            Cotizá tu proyecto
          </Link>
        </div>
      </div>
      <div className="border-t border-border">
        <div className="cuerpo-chico mx-auto flex w-full max-w-6xl flex-wrap justify-between gap-4 px-6 py-5 text-muted">
          <span>
            © {site.nombre} · {site.descriptor} desde {site.desde}
          </span>
          <span className="flex gap-4">
            <Link href="/legales/terminos" className="hover:text-foreground">
              Términos
            </Link>
            <Link href="/legales/privacidad" className="hover:text-foreground">
              Privacidad
            </Link>
          </span>
        </div>
      </div>
    </footer>
  );
}
