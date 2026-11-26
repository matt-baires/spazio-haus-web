import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "articulos" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_articulos_v" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "articulos" CASCADE;
  DROP TABLE "_articulos_v" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT IF EXISTS "payload_locked_documents_rels_articulos_fk";
  
  DROP INDEX IF EXISTS "payload_locked_documents_rels_articulos_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "articulos_id";
  DROP TYPE "public"."enum_articulos_categoria";
  DROP TYPE "public"."enum_articulos_status";
  DROP TYPE "public"."enum__articulos_v_version_categoria";
  DROP TYPE "public"."enum__articulos_v_version_status";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_articulos_categoria" AS ENUM('Materiales', 'Cuidados', 'Guías');
  CREATE TYPE "public"."enum_articulos_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__articulos_v_version_categoria" AS ENUM('Materiales', 'Cuidados', 'Guías');
  CREATE TYPE "public"."enum__articulos_v_version_status" AS ENUM('draft', 'published');
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
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "articulos_id" integer;
  ALTER TABLE "articulos" ADD CONSTRAINT "articulos_imagen_id_medios_id_fk" FOREIGN KEY ("imagen_id") REFERENCES "public"."medios"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articulos_v" ADD CONSTRAINT "_articulos_v_parent_id_articulos_id_fk" FOREIGN KEY ("parent_id") REFERENCES "public"."articulos"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_articulos_v" ADD CONSTRAINT "_articulos_v_version_imagen_id_medios_id_fk" FOREIGN KEY ("version_imagen_id") REFERENCES "public"."medios"("id") ON DELETE set null ON UPDATE no action;
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
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_articulos_fk" FOREIGN KEY ("articulos_id") REFERENCES "public"."articulos"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_articulos_id_idx" ON "payload_locked_documents_rels" USING btree ("articulos_id");`)
}
