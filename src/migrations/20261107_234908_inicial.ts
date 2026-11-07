import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_consultas_estado" AS ENUM('nueva', 'en-presupuesto', 'presupuestada', 'ganada', 'perdida');
  CREATE TYPE "public"."enum_consultas_perfil" AS ENUM('particular', 'profesional');
  CREATE TYPE "public"."enum_obras_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__obras_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_materiales_muestras_textura" AS ENUM('lisa', 'madera');
  CREATE TYPE "public"."enum_articulos_categoria" AS ENUM('Materiales', 'Cuidados', 'Guías');
  CREATE TYPE "public"."enum_articulos_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articulos_v_version_categoria" AS ENUM('Materiales', 'Cuidados', 'Guías');
  CREATE TYPE "public"."enum__articulos_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum_usuarios_rol" AS ENUM('admin', 'editor');
  CREATE TABLE "consultas_adjuntos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nombre" varchar,
  	"pathname" varchar,
  	"tipo" varchar,
  	"tamano" numeric
  );
  
  CREATE TABLE "consultas" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"estado" "enum_consultas_estado" DEFAULT 'nueva' NOT NULL,
  	"notas" varchar,
  	"nombre" varchar NOT NULL,
  	"perfil" "enum_consultas_perfil",
  	"email" varchar,
  	"telefono" varchar,
  	"tipo" varchar,
  	"ambiente" varchar,
  	"medidas" varchar,
  	"zona" varchar,
  	"plazo" varchar,
  	"presupuesto" varchar,
  	"mensaje" varchar,
  	"origen" varchar,
  	"referencia" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "obras_materiales" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar
  );
  
  CREATE TABLE "obras" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar,
  	"slug" varchar,
  	"orden" numeric DEFAULT 0,
  	"ejemplo" boolean DEFAULT false,
  	"destacada" boolean DEFAULT false,
  	"tipo_id" integer,
  	"ambiente" varchar,
  	"zona" varchar,
  	"descripcion" varchar,
  	"detalle" varchar,
  	"foto_detalle_id" integer,
  	"fotos_previstas" numeric DEFAULT 3,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_obras_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "obras_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"medios_id" integer
  );
  
  CREATE TABLE "_obras_v_version_materiales" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"texto" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_obras_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_titulo" varchar,
  	"version_slug" varchar,
  	"version_orden" numeric DEFAULT 0,
  	"version_ejemplo" boolean DEFAULT false,
  	"version_destacada" boolean DEFAULT false,
  	"version_tipo_id" integer,
  	"version_ambiente" varchar,
  	"version_zona" varchar,
  	"version_descripcion" varchar,
  	"version_detalle" varchar,
  	"version_foto_detalle_id" integer,
  	"version_fotos_previstas" numeric DEFAULT 3,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__obras_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "_obras_v_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"medios_id" integer
  );
  
  CREATE TABLE "servicios_que_resolvemos" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL
  );
  
  CREATE TABLE "servicios_materiales" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"texto" varchar NOT NULL
  );
  
  CREATE TABLE "servicios" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"orden" numeric DEFAULT 0,
  	"resumen" varchar NOT NULL,
  	"intro" varchar NOT NULL,
  	"imagen_id" integer,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "materiales_muestras" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"color" varchar NOT NULL,
  	"textura" "enum_materiales_muestras_textura" DEFAULT 'lisa',
  	"foto_id" integer
  );
  
  CREATE TABLE "materiales" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nombre" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"orden" numeric DEFAULT 0,
  	"ejemplo" boolean DEFAULT false,
  	"descripcion" varchar NOT NULL,
  	"ideal" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "preguntas" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"pregunta" varchar NOT NULL,
  	"respuesta" varchar NOT NULL,
  	"orden" numeric DEFAULT 0,
  	"en_home" boolean DEFAULT false,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "articulos" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"titulo" varchar,
  	"slug" varchar,
  	"ejemplo" boolean DEFAULT false,
  	"bajada" varchar,
  	"fecha" timestamp(3) with time zone,
  	"categoria" "enum_articulos_categoria",
  	"imagen_id" integer,
  	"cuerpo" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"_status" "enum_articulos_status" DEFAULT 'draft'
  );
  
  CREATE TABLE "_articulos_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"parent_id" integer,
  	"version_titulo" varchar,
  	"version_slug" varchar,
  	"version_ejemplo" boolean DEFAULT false,
  	"version_bajada" varchar,
  	"version_fecha" timestamp(3) with time zone,
  	"version_categoria" "enum__articulos_v_version_categoria",
  	"version_imagen_id" integer,
  	"version_cuerpo" jsonb,
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"version__status" "enum__articulos_v_version_status" DEFAULT 'draft',
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"latest" boolean
  );
  
  CREATE TABLE "medios" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"alt" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"url" varchar,
  	"thumbnail_u_r_l" varchar,
  	"filename" varchar,
  	"mime_type" varchar,
  	"filesize" numeric,
  	"width" numeric,
  	"height" numeric,
  	"focal_x" numeric,
  	"focal_y" numeric,
  	"sizes_miniatura_url" varchar,
  	"sizes_miniatura_width" numeric,
  	"sizes_miniatura_height" numeric,
  	"sizes_miniatura_mime_type" varchar,
  	"sizes_miniatura_filesize" numeric,
  	"sizes_miniatura_filename" varchar,
  	"sizes_media_url" varchar,
  	"sizes_media_width" numeric,
  	"sizes_media_height" numeric,
  	"sizes_media_mime_type" varchar,
  	"sizes_media_filesize" numeric,
  	"sizes_media_filename" varchar
  );
  
  CREATE TABLE "usuarios_sessions" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"created_at" timestamp(3) with time zone,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE TABLE "usuarios" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"nombre" varchar,
  	"rol" "enum_usuarios_rol" DEFAULT 'admin' NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"email" varchar NOT NULL,
  	"reset_password_token" varchar,
  	"reset_password_expiration" timestamp(3) with time zone,
  	"salt" varchar,
  	"hash" varchar,
  	"reset_password_requested_at" timestamp(3) with time zone,
  	"login_attempts" numeric DEFAULT 0,
  	"lock_until" timestamp(3) with time zone
  );
  
  CREATE TABLE "payload_kv" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar NOT NULL,
  	"data" jsonb NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"global_slug" varchar,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_locked_documents_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"consultas_id" integer,
  	"obras_id" integer,
  	"servicios_id" integer,
  	"materiales_id" integer,
  	"preguntas_id" integer,
  	"articulos_id" integer,
  	"medios_id" integer,
  	"usuarios_id" integer
  );
  
  CREATE TABLE "payload_preferences" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"key" varchar,
  	"value" jsonb,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "payload_preferences_rels" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"order" integer,
  	"parent_id" integer NOT NULL,
  	"path" varchar NOT NULL,
  	"usuarios_id" integer
  );
  
  CREATE TABLE "payload_migrations" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar,
  	"batch" numeric,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL
  );
  
  CREATE TABLE "sitio" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"whatsapp" varchar,
  	"email" varchar,
  	"instagram_usuario" varchar DEFAULT '@spaziohaus.arg',
  	"instagram_url" varchar DEFAULT 'https://www.instagram.com/spaziohaus.arg/',
  	"direccion_calle" varchar DEFAULT 'Marco Polo 5379',
  	"direccion_localidad" varchar DEFAULT 'Caseros',
  	"direccion_provincia" varchar DEFAULT 'Buenos Aires',
  	"direccion_codigo_postal" varchar DEFAULT 'B1682',
  	"contenido_de_ejemplo" boolean DEFAULT true,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  ALTER TABLE "consultas_adjuntos" ADD CONSTRAINT "consultas_adjuntos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."consultas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "obras_materiales" ADD CONSTRAINT "obras_materiales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."obras"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "obras" ADD CONSTRAINT "obras_tipo_id_servicios_id_fk" FOREIGN KEY ("tipo_id") REFERENCES "public"."servicios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "obras" ADD CONSTRAINT "obras_foto_detalle_id_medios_id_fk" FOREIGN KEY ("foto_detalle_id") REFERENCES "public"."medios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "obras_rels" ADD CONSTRAINT "obras_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."obras"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "obras_rels" ADD CONSTRAINT "obras_rels_medios_fk" FOREIGN KEY ("medios_id") REFERENCES "public"."medios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_obras_v_version_materiales" ADD CONSTRAINT "_obras_v_version_materiales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_obras_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_obras_v" ADD CONSTRAINT "_obras_v_parent_id_obras_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."obras"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_obras_v" ADD CONSTRAINT "_obras_v_version_tipo_id_servicios_id_fk" FOREIGN KEY ("version_tipo_id") REFERENCES "public"."servicios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_obras_v" ADD CONSTRAINT "_obras_v_version_foto_detalle_id_medios_id_fk" FOREIGN KEY ("version_foto_detalle_id") REFERENCES "public"."medios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_obras_v_rels" ADD CONSTRAINT "_obras_v_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."_obras_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_obras_v_rels" ADD CONSTRAINT "_obras_v_rels_medios_fk" FOREIGN KEY ("medios_id") REFERENCES "public"."medios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "servicios_que_resolvemos" ADD CONSTRAINT "servicios_que_resolvemos_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."servicios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "servicios_materiales" ADD CONSTRAINT "servicios_materiales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."servicios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "servicios" ADD CONSTRAINT "servicios_imagen_id_medios_id_fk" FOREIGN KEY ("imagen_id") REFERENCES "public"."medios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "materiales_muestras" ADD CONSTRAINT "materiales_muestras_foto_id_medios_id_fk" FOREIGN KEY ("foto_id") REFERENCES "public"."medios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "materiales_muestras" ADD CONSTRAINT "materiales_muestras_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."materiales"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "articulos" ADD CONSTRAINT "articulos_imagen_id_medios_id_fk" FOREIGN KEY ("imagen_id") REFERENCES "public"."medios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articulos_v" ADD CONSTRAINT "_articulos_v_parent_id_articulos_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articulos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articulos_v" ADD CONSTRAINT "_articulos_v_version_imagen_id_medios_id_fk" FOREIGN KEY ("version_imagen_id") REFERENCES "public"."medios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "usuarios_sessions" ADD CONSTRAINT "usuarios_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_locked_documents"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_consultas_fk" FOREIGN KEY ("consultas_id") REFERENCES "public"."consultas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_obras_fk" FOREIGN KEY ("obras_id") REFERENCES "public"."obras"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_servicios_fk" FOREIGN KEY ("servicios_id") REFERENCES "public"."servicios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_materiales_fk" FOREIGN KEY ("materiales_id") REFERENCES "public"."materiales"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_preguntas_fk" FOREIGN KEY ("preguntas_id") REFERENCES "public"."preguntas"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articulos_fk" FOREIGN KEY ("articulos_id") REFERENCES "public"."articulos"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_medios_fk" FOREIGN KEY ("medios_id") REFERENCES "public"."medios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_usuarios_fk" FOREIGN KEY ("usuarios_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."payload_preferences"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_usuarios_fk" FOREIGN KEY ("usuarios_id") REFERENCES "public"."usuarios"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "consultas_adjuntos_order_idx" ON "consultas_adjuntos" USING btree ("_order");
  CREATE INDEX "consultas_adjuntos_parent_id_idx" ON "consultas_adjuntos" USING btree ("_parent_id");
  CREATE INDEX "consultas_updated_at_idx" ON "consultas" USING btree ("updated_at");
  CREATE INDEX "consultas_created_at_idx" ON "consultas" USING btree ("created_at");
  CREATE INDEX "obras_materiales_order_idx" ON "obras_materiales" USING btree ("_order");
  CREATE INDEX "obras_materiales_parent_id_idx" ON "obras_materiales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "obras_slug_idx" ON "obras" USING btree ("slug");
  CREATE INDEX "obras_tipo_idx" ON "obras" USING btree ("tipo_id");
  CREATE INDEX "obras_foto_detalle_idx" ON "obras" USING btree ("foto_detalle_id");
  CREATE INDEX "obras_updated_at_idx" ON "obras" USING btree ("updated_at");
  CREATE INDEX "obras_created_at_idx" ON "obras" USING btree ("created_at");
  CREATE INDEX "obras__status_idx" ON "obras" USING btree ("_status");
  CREATE INDEX "obras_rels_order_idx" ON "obras_rels" USING btree ("order");
  CREATE INDEX "obras_rels_parent_idx" ON "obras_rels" USING btree ("parent_id");
  CREATE INDEX "obras_rels_path_idx" ON "obras_rels" USING btree ("path");
  CREATE INDEX "obras_rels_medios_id_idx" ON "obras_rels" USING btree ("medios_id");
  CREATE INDEX "_obras_v_version_materiales_order_idx" ON "_obras_v_version_materiales" USING btree ("_order");
  CREATE INDEX "_obras_v_version_materiales_parent_id_idx" ON "_obras_v_version_materiales" USING btree ("_parent_id");
  CREATE INDEX "_obras_v_parent_idx" ON "_obras_v" USING btree ("parent_id");
  CREATE INDEX "_obras_v_version_version_slug_idx" ON "_obras_v" USING btree ("version_slug");
  CREATE INDEX "_obras_v_version_version_tipo_idx" ON "_obras_v" USING btree ("version_tipo_id");
  CREATE INDEX "_obras_v_version_version_foto_detalle_idx" ON "_obras_v" USING btree ("version_foto_detalle_id");
  CREATE INDEX "_obras_v_version_version_updated_at_idx" ON "_obras_v" USING btree ("version_updated_at");
  CREATE INDEX "_obras_v_version_version_created_at_idx" ON "_obras_v" USING btree ("version_created_at");
  CREATE INDEX "_obras_v_version_version__status_idx" ON "_obras_v" USING btree ("version__status");
  CREATE INDEX "_obras_v_created_at_idx" ON "_obras_v" USING btree ("created_at");
  CREATE INDEX "_obras_v_updated_at_idx" ON "_obras_v" USING btree ("updated_at");
  CREATE INDEX "_obras_v_latest_idx" ON "_obras_v" USING btree ("latest");
  CREATE INDEX "_obras_v_rels_order_idx" ON "_obras_v_rels" USING btree ("order");
  CREATE INDEX "_obras_v_rels_parent_idx" ON "_obras_v_rels" USING btree ("parent_id");
  CREATE INDEX "_obras_v_rels_path_idx" ON "_obras_v_rels" USING btree ("path");
  CREATE INDEX "_obras_v_rels_medios_id_idx" ON "_obras_v_rels" USING btree ("medios_id");
  CREATE INDEX "servicios_que_resolvemos_order_idx" ON "servicios_que_resolvemos" USING btree ("_order");
  CREATE INDEX "servicios_que_resolvemos_parent_id_idx" ON "servicios_que_resolvemos" USING btree ("_parent_id");
  CREATE INDEX "servicios_materiales_order_idx" ON "servicios_materiales" USING btree ("_order");
  CREATE INDEX "servicios_materiales_parent_id_idx" ON "servicios_materiales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "servicios_slug_idx" ON "servicios" USING btree ("slug");
  CREATE INDEX "servicios_imagen_idx" ON "servicios" USING btree ("imagen_id");
  CREATE INDEX "servicios_updated_at_idx" ON "servicios" USING btree ("updated_at");
  CREATE INDEX "servicios_created_at_idx" ON "servicios" USING btree ("created_at");
  CREATE INDEX "materiales_muestras_order_idx" ON "materiales_muestras" USING btree ("_order");
  CREATE INDEX "materiales_muestras_parent_id_idx" ON "materiales_muestras" USING btree ("_parent_id");
  CREATE INDEX "materiales_muestras_foto_idx" ON "materiales_muestras" USING btree ("foto_id");
  CREATE UNIQUE INDEX "materiales_slug_idx" ON "materiales" USING btree ("slug");
  CREATE INDEX "materiales_updated_at_idx" ON "materiales" USING btree ("updated_at");
  CREATE INDEX "materiales_created_at_idx" ON "materiales" USING btree ("created_at");
  CREATE INDEX "preguntas_updated_at_idx" ON "preguntas" USING btree ("updated_at");
  CREATE INDEX "preguntas_created_at_idx" ON "preguntas" USING btree ("created_at");
  CREATE UNIQUE INDEX "articulos_slug_idx" ON "articulos" USING btree ("slug");
  CREATE INDEX "articulos_imagen_idx" ON "articulos" USING btree ("imagen_id");
  CREATE INDEX "articulos_updated_at_idx" ON "articulos" USING btree ("updated_at");
  CREATE INDEX "articulos_created_at_idx" ON "articulos" USING btree ("created_at");
  CREATE INDEX "articulos__status_idx" ON "articulos" USING btree ("_status");
  CREATE INDEX "_articulos_v_parent_idx" ON "_articulos_v" USING btree ("parent_id");
  CREATE INDEX "_articulos_v_version_version_slug_idx" ON "_articulos_v" USING btree ("version_slug");
  CREATE INDEX "_articulos_v_version_version_imagen_idx" ON "_articulos_v" USING btree ("version_imagen_id");
  CREATE INDEX "_articulos_v_version_version_updated_at_idx" ON "_articulos_v" USING btree ("version_updated_at");
  CREATE INDEX "_articulos_v_version_version_created_at_idx" ON "_articulos_v" USING btree ("version_created_at");
  CREATE INDEX "_articulos_v_version_version__status_idx" ON "_articulos_v" USING btree ("version__status");
  CREATE INDEX "_articulos_v_created_at_idx" ON "_articulos_v" USING btree ("created_at");
  CREATE INDEX "_articulos_v_updated_at_idx" ON "_articulos_v" USING btree ("updated_at");
  CREATE INDEX "_articulos_v_latest_idx" ON "_articulos_v" USING btree ("latest");
  CREATE INDEX "medios_updated_at_idx" ON "medios" USING btree ("updated_at");
  CREATE INDEX "medios_created_at_idx" ON "medios" USING btree ("created_at");
  CREATE UNIQUE INDEX "medios_filename_idx" ON "medios" USING btree ("filename");
  CREATE INDEX "medios_sizes_miniatura_sizes_miniatura_filename_idx" ON "medios" USING btree ("sizes_miniatura_filename");
  CREATE INDEX "medios_sizes_media_sizes_media_filename_idx" ON "medios" USING btree ("sizes_media_filename");
  CREATE INDEX "usuarios_sessions_order_idx" ON "usuarios_sessions" USING btree ("_order");
  CREATE INDEX "usuarios_sessions_parent_id_idx" ON "usuarios_sessions" USING btree ("_parent_id");
  CREATE INDEX "usuarios_updated_at_idx" ON "usuarios" USING btree ("updated_at");
  CREATE INDEX "usuarios_created_at_idx" ON "usuarios" USING btree ("created_at");
  CREATE UNIQUE INDEX "usuarios_email_idx" ON "usuarios" USING btree ("email");
  CREATE UNIQUE INDEX "payload_kv_key_idx" ON "payload_kv" USING btree ("key");
  CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents" USING btree ("global_slug");
  CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents" USING btree ("updated_at");
  CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents" USING btree ("created_at");
  CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels" USING btree ("order");
  CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels" USING btree ("parent_id");
  CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels" USING btree ("path");
  CREATE INDEX "payload_locked_documents_rels_consultas_id_idx" ON "payload_locked_documents_rels" USING btree ("consultas_id");
  CREATE INDEX "payload_locked_documents_rels_obras_id_idx" ON "payload_locked_documents_rels" USING btree ("obras_id");
  CREATE INDEX "payload_locked_documents_rels_servicios_id_idx" ON "payload_locked_documents_rels" USING btree ("servicios_id");
  CREATE INDEX "payload_locked_documents_rels_materiales_id_idx" ON "payload_locked_documents_rels" USING btree ("materiales_id");
  CREATE INDEX "payload_locked_documents_rels_preguntas_id_idx" ON "payload_locked_documents_rels" USING btree ("preguntas_id");
  CREATE INDEX "payload_locked_documents_rels_articulos_id_idx" ON "payload_locked_documents_rels" USING btree ("articulos_id");
  CREATE INDEX "payload_locked_documents_rels_medios_id_idx" ON "payload_locked_documents_rels" USING btree ("medios_id");
  CREATE INDEX "payload_locked_documents_rels_usuarios_id_idx" ON "payload_locked_documents_rels" USING btree ("usuarios_id");
  CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences" USING btree ("key");
  CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences" USING btree ("updated_at");
  CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences" USING btree ("created_at");
  CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels" USING btree ("order");
  CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels" USING btree ("parent_id");
  CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels" USING btree ("path");
  CREATE INDEX "payload_preferences_rels_usuarios_id_idx" ON "payload_preferences_rels" USING btree ("usuarios_id");
  CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations" USING btree ("updated_at");
  CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations" USING btree ("created_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "consultas_adjuntos" CASCADE;
  DROP TABLE "consultas" CASCADE;
  DROP TABLE "obras_materiales" CASCADE;
  DROP TABLE "obras" CASCADE;
  DROP TABLE "obras_rels" CASCADE;
  DROP TABLE "_obras_v_version_materiales" CASCADE;
  DROP TABLE "_obras_v" CASCADE;
  DROP TABLE "_obras_v_rels" CASCADE;
  DROP TABLE "servicios_que_resolvemos" CASCADE;
  DROP TABLE "servicios_materiales" CASCADE;
  DROP TABLE "servicios" CASCADE;
  DROP TABLE "materiales_muestras" CASCADE;
  DROP TABLE "materiales" CASCADE;
  DROP TABLE "preguntas" CASCADE;
  DROP TABLE "articulos" CASCADE;
  DROP TABLE "_articulos_v" CASCADE;
  DROP TABLE "medios" CASCADE;
  DROP TABLE "usuarios_sessions" CASCADE;
  DROP TABLE "usuarios" CASCADE;
  DROP TABLE "payload_kv" CASCADE;
  DROP TABLE "payload_locked_documents" CASCADE;
  DROP TABLE "payload_locked_documents_rels" CASCADE;
  DROP TABLE "payload_preferences" CASCADE;
  DROP TABLE "payload_preferences_rels" CASCADE;
  DROP TABLE "payload_migrations" CASCADE;
  DROP TABLE "sitio" CASCADE;
  DROP TYPE "public"."enum_consultas_estado";
  DROP TYPE "public"."enum_consultas_perfil";
  DROP TYPE "public"."enum_obras_status";
  DROP TYPE "public"."enum__obras_v_version_status";
  DROP TYPE "public"."enum_materiales_muestras_textura";
  DROP TYPE "public"."enum_articulos_categoria";
  DROP TYPE "public"."enum_articulos_status";
  DROP TYPE "public"."enum__articulos_v_version_categoria";
  DROP TYPE "public"."enum__articulos_v_version_status";
  DROP TYPE "public"."enum_usuarios_rol";`)
}
