import type { Config } from "drizzle-kit";

export default {
  schema: "./src/schemas/database/index.ts",
  out: "./src/database/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL || "",
  },
  migrations: {
    table: "__drizzle_migrations",
    schema: "public",
  },
} satisfies Config;
