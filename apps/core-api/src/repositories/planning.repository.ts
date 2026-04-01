import { eq, asc } from "drizzle-orm";
import { db } from "../config/database-client.js";
import { planning_messages } from "../schemas/database/index.js";

export interface SavePlanningMessageInput {
  id: string;
  userId: string;
  role: "user" | "model";
  content: string;
}

export class PlanningRepository {
  async save(data: SavePlanningMessageInput) {
    await db.insert(planning_messages).values({
      id: data.id,
      user_id: data.userId,
      role: data.role,
      content: data.content,
      created_at: new Date(),
    });
  }

  async findByUser(userId: string) {
    return await db
      .select({
        role: planning_messages.role,
        content: planning_messages.content,
      })
      .from(planning_messages)
      .where(eq(planning_messages.user_id, userId))
      .orderBy(asc(planning_messages.created_at));
  }

  async deleteByUser(userId: string) {
    await db
      .delete(planning_messages)
      .where(eq(planning_messages.user_id, userId));
  }
}
