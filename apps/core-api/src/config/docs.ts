import swagger from "@fastify/swagger";
import swaggerUI from "@fastify/swagger-ui";
import { config } from "./environment.js";
import pkg from "../../../../package.json" with { type: "json" };

export class Docs {
  static buildSwaggerConfig() {
    return {
      openapi: {
        info: {
          title: pkg.name,
          version: pkg.version,
        },
        components: {
          securitySchemes: {
            bearerAuth: {
              type: "http",
              scheme: "bearer",
              bearerFormat: "JWT",
            },
          },
        },
        security: [{ bearerAuth: [] }],
      },
    };
  }

  static async register(fastify: any) {
    if (config.app.env === "production") {
      return;
    }

    await fastify.register(swagger, this.buildSwaggerConfig());
    await fastify.register(swaggerUI, {
      routePrefix: config.app.docs.path,
    });
  }
}
