import "dotenv/config";
import type { Config } from "drizzle-kit";

const rawUrl = process.env.DATABASE_URL || "";
if (!rawUrl) {
  console.error("DATABASE_URL is missing in environment variables");
  process.exit(1);
}

const url = new URL(rawUrl);

export default {
  schema: "./src/schemas/database/index.ts",
  out: "./src/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    host: url.hostname,
    port: parseInt(url.port) || 5432,
    user: url.username,
    password: url.password,
    database: url.pathname.substring(1),
    ssl: { rejectUnauthorized: false },
  },
  migrations: {
    table: "__drizzle_migrations",
    schema: "public",
  },
} satisfies Config;
