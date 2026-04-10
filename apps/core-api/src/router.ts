import { FastifyInstance } from "fastify";
import {
  authController,
  promptController,
  projectController,
  taskController,
  syncController,
  planningConversationController,
  planningMessageController,
} from "./providers/dependencies.js";

export class AppRouter {
  public register(fastify: FastifyInstance, prefix = "") {
    authController.registerRoutes(fastify, prefix);
    promptController.registerRoutes(fastify, prefix);
    projectController.registerRoutes(fastify, prefix);
    taskController.registerRoutes(fastify, prefix);
    syncController.registerRoutes(fastify, prefix);
    planningConversationController.registerRoutes(fastify, prefix);
    planningMessageController.registerRoutes(fastify, prefix);

    fastify.get("/", async () => {
      return { status: "ok", message: "Now, we're talking!" };
    });

    fastify.get("/health", async () => {
      return { status: "ok", message: "API is working" };
    });
  }
}
