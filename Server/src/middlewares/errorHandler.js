import { logger } from "../lib/logger.js";
import { appError } from "../errors/appError.js";

export function errorHandler(err, _req, res, _next) {
  logger.error({ err }, "Unhandled Error!");

  if (err instanceof appError) {
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
    });
  }

  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
}
