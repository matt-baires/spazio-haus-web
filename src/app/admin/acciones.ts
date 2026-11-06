"use server";

import { refresh } from "next/cache";
import { actualizarConsulta } from "@/lib/consultas";
import { esEstado } from "@/lib/estados";

export async function guardarSeguimiento(formData: FormData) {
  const id = String(formData.get("id") ?? "");
  const estado = formData.get("estado");
  const notas = String(formData.get("notas") ?? "").slice(0, 4000);
  if (!id || !esEstado(estado)) return;
  await actualizarConsulta(id, { estado, notas });
  refresh();
}
