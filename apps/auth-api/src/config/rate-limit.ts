import { config } from "./environment.js";

export const rateLimitOptions = {
  global: true,
  max: config.app.rateLimit.max,
  timeWindow: config.app.rateLimit.timeWindow,
};
