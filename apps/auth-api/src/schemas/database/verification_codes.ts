import { boolean, index, pgTable, text, timestamp } from "drizzle-orm/pg-core";

export const verification_codes = pgTable(
  "verification_codes",
  {
    id: text("id").primaryKey(),
    email: text("email").notNull(),
    code: text("code").notNull(),
    expires_at: timestamp("expires_at", { mode: "date" }).notNull(),
    used: boolean("used").notNull().default(false),
    created_at: timestamp("created_at", { mode: "date" }),
  },
  (table) => [
    index("verification_codes_email_idx").on(table.email),
    index("verification_codes_used_idx").on(table.used),
  ],
);
