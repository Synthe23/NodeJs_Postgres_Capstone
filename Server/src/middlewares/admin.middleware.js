import { appError } from "../errors/appError.js";

export function adminMiddleware(req, res, next) {
  if (!req.user || req.user.role !== "ADMIN") {
    return next(new appError(403, "Admin access required!"));
  }

  next();
}