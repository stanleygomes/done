import { pgTable, text, timestamp, index } from "drizzle-orm/pg-core";

export const promptLogs = pgTable(
  "prompt_logs",
  {
    id: text("id").primaryKey(),
    user_id: text("user_id").notNull(),
    user_email: text("user_email").notNull(),
    prompt: text("prompt").notNull(),
    response: text("response").notNull(),
    created_at: timestamp("created_at", { withTimezone: true, mode: "date" })
      .defaultNow()
      .notNull(),
  },
  (table) => [
    index("prompt_logs_user_id_idx").on(table.user_id),
    index("prompt_logs_created_at_idx").on(table.created_at),
  ],
);
