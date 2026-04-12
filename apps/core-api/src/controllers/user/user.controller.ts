import { FastifyInstance } from "fastify";
import { AuthMiddleware, UserAuth } from "../../middlewares/auth.middleware.js";
import { GetProfileService } from "../../services/get-profile.service.js";
import { UpdateProfileService } from "../../services/update-profile.service.js";
import { getProfileSchema, updateProfileSchema } from "./user.doc.js";

export class UserController {
  constructor(
    private readonly getProfileService: GetProfileService,
    private readonly updateProfileService: UpdateProfileService,
  ) {}

  registerRoutes(fastify: FastifyInstance, prefix = "") {
    fastify.get(
      `${prefix}/v1/users/me`,
      { preHandler: [AuthMiddleware.authorize], schema: getProfileSchema },
      async (request, reply) => {
        const { id } = (request as any).user as UserAuth;
        const result = await this.getProfileService.execute(id);
        reply.send(result);
      },
    );

    fastify.patch<{ Body: { name: string } }>(
      `${prefix}/v1/users/me`,
      { preHandler: [AuthMiddleware.authorize], schema: updateProfileSchema },
      async (request, reply) => {
        const { id } = (request as any).user as UserAuth;
        const result = await this.updateProfileService.execute(
          id,
          request.body,
        );
        reply.send(result);
      },
    );
  }
}
