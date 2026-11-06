import Link from "next/link";
import { notFound } from "next/navigation";
import { connection } from "next/server";
import { Suspense } from "react";
import { Button } from "@heroui/react";
import { EstadoChip } from "@/components/estado-chip";
import { getServicio } from "@/content/servicios";
import { ESTADOS, obtenerConsulta } from "@/lib/consultas";
import { fechaHora } from "@/lib/formato";
import { guardarSeguimiento } from "../../acciones";

async function Detalle({ params }: { params: PageProps<"/admin/consultas/[id]">["params"] }) {
  await connection();
  const { id } = await params;
  const c = await obtenerConsulta(id);
  if (!c) notFound();

  const datos: [string, string | undefined][] = [
    ["Perfil", c.perfil === "profesional" ? "Arquitecto o interiorista" : "Particular"],
    ["Qué quiere hacer", getServicio(c.tipo)?.nombre ?? "Otro"],
    ["Ambiente", c.ambiente],
    ["Medidas", c.medidas],
    ["Zona", c.zona],
    ["Plazo", c.plazo],
    ["Presupuesto orientativo", c.presupuesto],
    ["Desde la obra", c.referencia?.replace(/-/g, " ")],
    ["Cómo nos conoció", c.origen],
  ];
  const mensajeWa = `Hola ${c.nombre}, te escribimos de Spazio Haus por tu consulta.`;
  const telefonoWa = c.telefono?.replace(/\D/g, "");

  return (
    <div className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
      <div className="flex flex-col gap-6">
        <div className="flex flex-wrap items-center gap-3">
          <h1 className="titulo">{c.nombre}</h1>
          <EstadoChip estado={c.estado} />
        </div>
        <p className="cuerpo-chico text-muted">Recibida el {fechaHora(c.creada)}</p>

        <section className="rounded-lg border border-border bg-background p-6">
          <h2 className="etiqueta mb-4 text-muted">El proyecto</h2>
          <dl className="cuerpo-chico grid grid-cols-[auto_1fr] gap-x-6 gap-y-3">
            {datos
              .filter(([, v]) => v)
              .map(([k, v]) => (
                <div key={k} className="contents">
                  <dt className="text-muted">{k}</dt>
                  <dd>{v}</dd>
                </div>
              ))}
          </dl>
          <h3 className="etiqueta mb-2 mt-6 text-muted">Mensaje</h3>
          <p className="whitespace-pre-line">{c.mensaje}</p>
        </section>

        <section className="rounded-lg border border-border bg-background p-6">
          <h2 className="etiqueta mb-4 text-muted">Adjuntos</h2>
          {c.adjuntos.length === 0 ? (
            <p className="cuerpo-chico text-muted">Sin adjuntos.</p>
          ) : (
            <ul className="grid gap-4 sm:grid-cols-3">
              {c.adjuntos.map((a) => {
                const url = `/api/admin/adjunto?p=${encodeURIComponent(a.pathname)}`;
                return (
                  <li key={a.pathname}>
                    <a href={url} target="_blank" rel="noopener noreferrer" className="group flex flex-col gap-2">
                      {a.tipo.startsWith("image/") && !a.tipo.includes("hei") ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={url} alt={a.nombre} className="aspect-square w-full border border-border object-cover" />
                      ) : (
                        <span className="flex aspect-square w-full items-center justify-center border border-border bg-marfil etiqueta text-muted">
                          {a.tipo.includes("pdf") ? "PDF" : "Archivo"}
                        </span>
                      )}
                      <span className="cuerpo-chico truncate group-hover:underline">{a.nombre}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>

      <aside className="flex flex-col gap-6">
        <section className="rounded-lg border border-border bg-background p-6">
          <h2 className="etiqueta mb-4 text-muted">Contacto</h2>
          <div className="cuerpo-chico flex flex-col gap-2">
            {c.email && (
              <a href={`mailto:${c.email}?subject=${encodeURIComponent("Tu consulta en Spazio Haus")}`} className="underline underline-offset-4">
                {c.email}
              </a>
            )}
            {c.telefono && <span>{c.telefono}</span>}
            {telefonoWa && (
              <a
                href={`https://wa.me/${telefonoWa}?text=${encodeURIComponent(mensajeWa)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="underline underline-offset-4"
              >
                Responder por WhatsApp
              </a>
            )}
          </div>
        </section>

        <form action={guardarSeguimiento} className="flex flex-col gap-4 rounded-lg border border-border bg-background p-6">
          <h2 className="etiqueta text-muted">Seguimiento</h2>
          <input type="hidden" name="id" value={c.id} />
          <label className="flex flex-col gap-2 text-sm font-medium">
            Estado
            <select
              name="estado"
              defaultValue={c.estado}
              className="rounded border border-border bg-background px-3 py-2 font-normal"
            >
              {ESTADOS.map((e) => (
                <option key={e.id} value={e.id}>
                  {e.nombre}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col gap-2 text-sm font-medium">
            Notas internas
            <textarea
              name="notas"
              rows={5}
              defaultValue={c.notas ?? ""}
              className="rounded border border-border bg-background px-3 py-2 font-normal"
            />
          </label>
          <Button type="submit">Guardar</Button>
        </form>
      </aside>
    </div>
  );
}

export default function ConsultaPage(props: PageProps<"/admin/consultas/[id]">) {
  return (
    <div className="flex flex-col gap-6">
      <Link href="/admin" className="cuerpo-chico text-muted hover:text-foreground">
        ← Todas las consultas
      </Link>
      <Suspense fallback={<p className="text-muted">Cargando consulta…</p>}>
        <Detalle params={props.params} />
      </Suspense>
    </div>
  );
}
