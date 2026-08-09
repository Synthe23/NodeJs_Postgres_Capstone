import { env } from "../config/env.js";
import pino from "pino";

const isProduction = env.isProduction;

export const logger = pino({
  level: env.logLevel.toLowerCase(),

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