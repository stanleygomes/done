import { FastifyCorsOptions } from "@fastify/cors";
import { config } from "./environment.js";

export const corsOptions: FastifyCorsOptions = {
  origin: config.app.cors.allowedOrigin,
  credentials: true,
  methods:
    typeof config.app.cors.allowedMethods === "string"
      ? config.app.cors.allowedMethods.split(",")
      : config.app.cors.allowedMethods,
  allowedHeaders:
    typeof config.app.cors.allowedHeaders === "string"
      ? config.app.cors.allowedHeaders.split(",")
      : config.app.cors.allowedHeaders,
};
