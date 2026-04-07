import "dotenv/config";
import type { Config } from "drizzle-kit";

// Clean the auth token in case it has quotes from the .env loader
const authToken = (process.env.DATABASE_AUTH_TOKEN || "").replace(/['"]/g, "");

export default {
  schema: "./src/schemas/database/index.ts",
  out: "./src/database/migrations",
  dialect: "turso",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
    authToken,
  },
  migrations: {
    table: "__drizzle_migrations",
  },
} satisfies Config;
