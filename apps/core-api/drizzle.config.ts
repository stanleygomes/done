import "dotenv/config";
import type { Config } from "drizzle-kit";

const rawUrl = process.env.DATABASE_URL || "";
if (!rawUrl) {
  console.error("DATABASE_URL is missing in environment variables");
  process.exit(1);
}

const databaseUrl = new URL(rawUrl);
databaseUrl.searchParams.delete("sslmode");

export default {
  schema: "./src/schemas/database/index.ts",
  out: "./src/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl.toString(),
    ssl: { rejectUnauthorized: false },
  },
  migrations: {
    table: "__drizzle_migrations",
    schema: "public",
  },
} satisfies Config;
