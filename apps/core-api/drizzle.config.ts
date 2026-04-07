import "dotenv/config";
import type { Config } from "drizzle-kit";

const databaseUrl = new URL(process.env.DATABASE_URL || "");
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
