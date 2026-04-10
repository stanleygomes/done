import { drizzle } from "drizzle-orm/node-postgres";
import { Pool } from "pg";
import * as schema from "../schemas/database/index.js";
import { config } from "./environment.js";

const isDevelopment = config.app.env === "development";

const pool = new Pool({
  connectionString: config.database.url,
  ssl: isDevelopment ? false : { rejectUnauthorized: false },
});

export const db = drizzle(pool, { schema });
