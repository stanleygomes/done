import { FastifyInstance, FastifyRequest } from "fastify";
import { PlanningService } from "../../services/planning.service.js";
import { AuthMiddleware, UserAuth } from "../../middlewares/auth.middleware.js";

type AuthenticatedRequest = FastifyRequest & {
  user: UserAuth;
};

export class PlanningController {
  constructor(private readonly planningService: PlanningService) {}

  registerRoutes(fastify: FastifyInstance, prefix = "") {
    fastify.post<{ Body: { message: string } }>(
      `${prefix}/v1/planning/chat`,
      { preHandler: AuthMiddleware.authorize },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;
        const { message } = request.body;

        const response = await this.planningService.chat(
          authRequest.user.id,
          message,
          request.headers.authorization,
        );

        reply.send({ response });
      },
    );

    fastify.get(
      `${prefix}/v1/planning/messages`,
      { preHandler: AuthMiddleware.authorize },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;
        const messages = await this.planningService.getMessages(
          authRequest.user.id,
        );
        reply.send({ messages });
      },
    );

    fastify.delete(
      `${prefix}/v1/planning/messages`,
      { preHandler: AuthMiddleware.authorize },
      async (request, reply) => {
        const authRequest = request as AuthenticatedRequest;
        await this.planningService.clearHistory(authRequest.user.id);
        reply.send({ success: true });
      },
    );
  }
}
