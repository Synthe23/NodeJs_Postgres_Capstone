import { logger } from "../lib/logger.js";

export function errorHandler(err, _req, res, _next) {
  logger.error({ err }, "Unhandled Error!");
  res.status(500).json({ 
    success: false, 
    message: err.message 
  });
}
