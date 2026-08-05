import { env } from "node:process";
import pino from "pino";

const isProduction =
  env.NODE_ENV === "production" || env.isProduction === "true";

export const logger = pino({
  // Safely fallback to lowercase info if logLevel is missing or uppercase
  level: (env.logLevel || "info").toLowerCase(),

  transport: isProduction
    ? undefined
    : {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
        },
      },
});
