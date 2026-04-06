ALTER TABLE "memories" DISABLE ROW LEVEL SECURITY;--> statement-breakpoint
DROP TABLE "memories" CASCADE;--> statement-breakpoint
ALTER TABLE "planning_conversations" ALTER COLUMN "title" SET DEFAULT '';--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "created_at" SET DATA TYPE timestamp (3);--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "updated_at" SET DATA TYPE timestamp (3);--> statement-breakpoint
ALTER TABLE "tasks" ALTER COLUMN "deleted_at" SET DATA TYPE timestamp (3);--> statement-breakpoint
ALTER TABLE "planning_messages" DROP COLUMN "user_id";