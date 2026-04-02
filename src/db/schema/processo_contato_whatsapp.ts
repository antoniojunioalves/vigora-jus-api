import { integer, pgTable, serial, timestamp, unique } from "drizzle-orm/pg-core";
import { contatosWhatsappTable } from "./contatos_whatsapp.js";
import { processosTable } from "./processos.js";

export const processoContatoWhatsappTable = pgTable(
  "processo_contato_whatsapp",
  {
    id: serial("id").primaryKey(),
    processoId: integer("processo_id")
      .notNull()
      .references(() => processosTable.id, { onDelete: "cascade" }),
    contatoWhatsappId: integer("contato_whatsapp_id")
      .notNull()
      .references(() => contatosWhatsappTable.id, { onDelete: "cascade" }),
    criadoEm: timestamp("criado_em").notNull().defaultNow(),
  },
  (t) => [unique().on(t.processoId, t.contatoWhatsappId)]
);

export type ProcessoContatoWhatsapp = typeof processoContatoWhatsappTable.$inferSelect;
