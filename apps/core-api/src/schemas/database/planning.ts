import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";

export const planning_messages = pgTable("planning_messages", {
  id: uuid("id").primaryKey(),
  user_id: text("user_id").notNull(),
  role: text("role").notNull(), // 'user' or 'model' (Gemini roles)
  content: text("content").notNull(),
  created_at: timestamp("created_at").defaultNow().notNull(),
});
