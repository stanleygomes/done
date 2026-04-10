import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["api/server.ts", "src/index.ts"],
  format: ["esm"],
  clean: true,
  bundle: true,
  splitting: false,
  minify: false,
  sourcemap: true,
  dts: false,
  outDir: "dist",
  external: ["fastify", "pg", "pino", "dotenv"],
  noExternal: ["@paul/*", "bcryptjs", "argon2"],
  publicDir: "src/database/migrations",
});
