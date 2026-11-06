import Link from "next/link";
import { connection } from "next/server";
import { Suspense } from "react";
import { EstadoChip } from "@/components/estado-chip";
import { ESTADOS, blobDisponible, listarConsultas } from "@/lib/consultas";
import { getServicio } from "@/content/servicios";
import { fechaHora } from "@/lib/formato";

async function Listado({ searchParams }: { searchParams: PageProps<"/admin">["searchParams"] }) {
  await connection();
  if (!blobDisponible()) {
    return <p className="text-danger">Falta conectar el almacenamiento (BLOB_READ_WRITE_TOKEN).</p>;
  }
  const filtro = (await searchParams).estado;
  const todas = await listarConsultas();
  const consultas = typeof filtro === "string" ? todas.filter((c) => c.estado === filtro) : todas;

  return (
    <div className="flex flex-col gap-6">
      <nav aria-label="Filtrar por estado" className="flex flex-wrap gap-2">
        <Link
          href="/admin"
          className={`cuerpo-chico rounded border px-3 py-1.5 ${!filtro ? "border-foreground bg-foreground text-crema" : "border-border bg-background"}`}
        >
          Todas ({todas.length})
        </Link>
        {ESTADOS.map((e) => {
          const n = todas.filter((c) => c.estado === e.id).length;
          const activo = filtro === e.id;
          return (
            <Link
              key={e.id}
              href={`/admin?estado=${e.id}`}
              className={`cuerpo-chico rounded border px-3 py-1.5 ${activo ? "border-foreground bg-foreground text-crema" : "border-border bg-background"}`}
            >
              {e.nombre} ({n})
            </Link>
          );
        })}
      </nav>

      {consultas.length === 0 ? (
        <div className="rounded-lg border border-border bg-background p-10 text-center">
          <p className="font-semibold">No hay consultas {filtro ? "en este estado" : "todavía"}.</p>
          <p className="cuerpo-chico mt-2 text-muted">
            Las consultas del formulario <Link href="/cotizar" className="underline">Cotizá tu proyecto</Link> aparecen acá.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto rounded-lg border border-border bg-background">
          <table className="w-full text-left">
            <thead className="etiqueta text-muted">
              <tr className="border-b border-border">
                <th className="px-4 py-3 font-medium">Fecha</th>
                <th className="px-4 py-3 font-medium">Nombre</th>
                <th className="px-4 py-3 font-medium">Proyecto</th>
                <th className="px-4 py-3 font-medium">Perfil</th>
                <th className="px-4 py-3 font-medium">Adjuntos</th>
                <th className="px-4 py-3 font-medium">Estado</th>
              </tr>
            </thead>
            <tbody className="cuerpo-chico">
              {consultas.map((c) => (
                <tr key={c.id} className="border-b border-border last:border-0 hover:bg-marfil">
                  <td className="whitespace-nowrap px-4 py-3 text-muted">{fechaHora(c.creada)}</td>
                  <td className="px-4 py-3">
                    <Link href={`/admin/consultas/${c.id}`} className="font-semibold underline-offset-4 hover:underline">
                      {c.nombre}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    {getServicio(c.tipo)?.nombre ?? "Otro"}
                    {c.zona && <span className="text-muted"> · {c.zona}</span>}
                  </td>
                  <td className="px-4 py-3 text-muted">{c.perfil === "profesional" ? "Profesional" : "Particular"}</td>
                  <td className="px-4 py-3 text-muted">{c.adjuntos.length || "—"}</td>
                  <td className="px-4 py-3">
                    <EstadoChip estado={c.estado} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default function AdminPage(props: PageProps<"/admin">) {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="titulo">Consultas</h1>
        <p className="cuerpo-chico mt-2 text-muted">Pedidos de cotización recibidos desde el sitio.</p>
      </div>
      <Suspense fallback={<p className="text-muted">Cargando consultas…</p>}>
        <Listado searchParams={props.searchParams} />
      </Suspense>
    </div>
  );
}
