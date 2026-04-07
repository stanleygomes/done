import { FastifyInstance } from "fastify";
import { authController } from "./providers/dependencies.js";

export class AppRouter {
  public register(fastify: FastifyInstance, prefix = "") {
    authController.registerRoutes(fastify, prefix);

    fastify.get("/", async () => {
      return { status: "ok", message: "Now, we're talking!" };
    });

    fastify.get("/health", async () => {
      return { status: "ok", message: "API is working" };
    });
  }
}
