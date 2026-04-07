import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import * as schema from "../schemas/database/index.js";
import { config } from "./environment.js";

const sql = neon(config.database.url);
export const db = drizzle(sql, { schema });
