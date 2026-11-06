"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useRef, useState, type FormEvent } from "react";
import {
  Button,
  Description,
  FieldError,
  Form,
  Input,
  Label,
  ListBox,
  Select,
  TextArea,
  TextField,
  buttonVariants,
} from "@heroui/react";

type Opcion = { id: string; nombre: string };

const ORIGENES: Opcion[] = [
  { id: "instagram", nombre: "Instagram" },
  { id: "google", nombre: "Google" },
  { id: "recomendacion", nombre: "Recomendación" },
  { id: "otro", nombre: "Otro" },
];

const MAX_MB = 4;

function Selector({
  name,
  label,
  opciones,
  defaultValue,
  isRequired,
  placeholder = "Elegí una opción",
}: {
  name: string;
  label: string;
  opciones: Opcion[];
  defaultValue?: string;
  isRequired?: boolean;
  placeholder?: string;
}) {
  return (
    <Select name={name} isRequired={isRequired} defaultValue={defaultValue} placeholder={placeholder} fullWidth>
      <Label>{label}</Label>
      <Select.Trigger>
        <Select.Value />
        <Select.Indicator />
      </Select.Trigger>
      <Select.Popover>
        <ListBox>
          {opciones.map((o) => (
            <ListBox.Item key={o.id} id={o.id} textValue={o.nombre}>
              {o.nombre}
              <ListBox.ItemIndicator />
            </ListBox.Item>
          ))}
        </ListBox>
      </Select.Popover>
      <FieldError />
    </Select>
  );
}

function Campo({
  name,
  label,
  descripcion,
  type = "text",
  isRequired,
  autoComplete,
}: {
  name: string;
  label: string;
  descripcion?: string;
  type?: string;
  isRequired?: boolean;
  autoComplete?: string;
}) {
  return (
    <TextField name={name} type={type} isRequired={isRequired} autoComplete={autoComplete} fullWidth>
      <Label>{label}</Label>
      <Input />
      {descripcion && <Description>{descripcion}</Description>}
      <FieldError />
    </TextField>
  );
}

export function CotizarForm({ tipos }: { tipos: Opcion[] }) {
  const params = useSearchParams();
  const tipoInicial = params.get("tipo") ?? undefined;
  const referencia = params.get("ref") ?? "";
  const perfilInicial = params.get("perfil") === "profesional" ? "profesional" : "particular";

  const [estado, setEstado] = useState<"listo" | "enviando" | "enviado" | "error">("listo");
  const [mensajeError, setMensajeError] = useState("");
  const [archivos, setArchivos] = useState<File[]>([]);
  const inputArchivos = useRef<HTMLInputElement>(null);

  const totalMb = archivos.reduce((t, a) => t + a.size, 0) / 1024 / 1024;

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (archivos.length > 3 || totalMb > MAX_MB) {
      setEstado("error");
      setMensajeError(`Podés adjuntar hasta 3 archivos y ${MAX_MB} MB en total.`);
      return;
    }
    setEstado("enviando");
    setMensajeError("");
    const fd = new FormData(e.currentTarget);
    try {
      const r = await fetch("/api/cotizar", { method: "POST", body: fd });
      const data = (await r.json()) as { ok: boolean; error?: string };
      if (!r.ok || !data.ok) throw new Error(data.error || "No pudimos enviar la consulta.");
      setEstado("enviado");
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (err) {
      setEstado("error");
      setMensajeError(err instanceof Error ? err.message : "No pudimos enviar la consulta.");
    }
  }

  if (estado === "enviado") {
    return (
      <div role="status" className="flex flex-col items-start gap-4 border border-border bg-marfil p-8">
        <span className="h-px w-10 bg-dorado" aria-hidden="true" />
        <h2 className="titulo">Recibimos tu consulta</h2>
        <p className="text-muted">
          La vamos a revisar y te contactamos para afinar el diseño y pasarte el presupuesto.
        </p>
        <Link href="/obras" className={buttonVariants({ variant: "outline" })}>
          Mientras tanto, mirá nuestras obras
        </Link>
      </div>
    );
  }

  return (
    <Form onSubmit={enviar} className="flex flex-col gap-10" encType="multipart/form-data">
      <input type="hidden" name="referencia" value={referencia} />
      <div aria-hidden="true" className="absolute -left-[9999px] h-0 w-0 overflow-hidden">
        <label>
          No completar este campo
          <input type="text" name="sitio_web" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <fieldset className="flex flex-col gap-5">
        <legend className="etiqueta mb-5 text-muted">El proyecto</legend>
        {referencia && (
          <p className="cuerpo-chico border-l-2 border-dorado pl-3 text-muted">
            Consulta a partir de la obra: {referencia.replace(/-/g, " ")}
          </p>
        )}
        <div className="grid gap-5 sm:grid-cols-2">
          <Selector
            name="perfil"
            label="¿Quién consulta?"
            defaultValue={perfilInicial}
            isRequired
            opciones={[
              { id: "particular", nombre: "Particular" },
              { id: "profesional", nombre: "Arquitecto o interiorista" },
            ]}
          />
          <Selector
            name="tipo"
            label="¿Qué querés hacer?"
            defaultValue={tipoInicial}
            isRequired
            opciones={[...tipos, { id: "otro", nombre: "Otro" }]}
          />
          <Campo name="ambiente" label="Ambiente" descripcion="Cocina, living, baño, dormitorio…" />
          <Campo name="medidas" label="Medidas aproximadas" descripcion="Ancho × alto × profundidad, en cm" />
          <Campo name="zona" label="Zona" descripcion="Barrio o localidad de la obra" />
          <Campo name="plazo" label="¿Para cuándo lo necesitás?" />
          <Campo name="presupuesto" label="Presupuesto orientativo (opcional)" />
        </div>
        <TextField name="mensaje" isRequired fullWidth>
          <Label>Contanos tu idea</Label>
          <TextArea rows={5} />
          <Description>Qué querés guardar, materiales o colores que te gustan, lo que te molesta del espacio hoy.</Description>
          <FieldError />
        </TextField>

        <div className="flex flex-col gap-2">
          <label htmlFor="adjuntos" className="text-sm font-medium">
            Fotos del espacio o planos (opcional)
          </label>
          <input
            ref={inputArchivos}
            id="adjuntos"
            name="adjuntos"
            type="file"
            multiple
            accept="image/jpeg,image/png,image/webp,image/heic,image/heif,application/pdf"
            onChange={(e) => setArchivos(Array.from(e.target.files ?? []))}
            className="cuerpo-chico rounded border border-border bg-background p-3 file:mr-4 file:rounded file:border-0 file:bg-marfil file:px-3 file:py-1.5 file:text-foreground"
          />
          <p className="cuerpo-chico text-muted">
            Hasta 3 archivos, {MAX_MB} MB en total. JPG, PNG, WEBP, HEIC o PDF.
            {archivos.length > 0 && ` Elegiste ${archivos.length} (${totalMb.toFixed(1)} MB).`}
          </p>
        </div>
      </fieldset>

      <fieldset className="flex flex-col gap-5">
        <legend className="etiqueta mb-5 text-muted">Tus datos</legend>
        <div className="grid gap-5 sm:grid-cols-2">
          <div className="sm:col-span-2">
            <Campo name="nombre" label="Nombre" isRequired autoComplete="name" />
          </div>
          <Campo name="email" label="Email" type="email" autoComplete="email" />
          <Campo name="telefono" label="Teléfono o WhatsApp" type="tel" autoComplete="tel" />
          <div className="sm:col-span-2">
            <Selector name="origen" label="¿Cómo nos conociste? (opcional)" opciones={ORIGENES} />
          </div>
        </div>
        <p className="cuerpo-chico text-muted">Necesitamos un email o un teléfono para responderte.</p>
      </fieldset>

      {estado === "error" && (
        <p role="alert" className="border-l-2 border-danger pl-3 text-danger">
          {mensajeError}
        </p>
      )}

      <div className="flex flex-col items-start gap-3">
        <Button type="submit" size="lg" isDisabled={estado === "enviando"}>
          {estado === "enviando" ? "Enviando…" : "Enviar consulta"}
        </Button>
        <p className="cuerpo-chico text-muted">
          Al enviar aceptás nuestra{" "}
          <Link href="/legales/privacidad" className="underline underline-offset-4">
            política de privacidad
          </Link>
          .
        </p>
      </div>
    </Form>
  );
}
