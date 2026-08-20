import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

export const adminTaskRouter = Router();

// Used both the auth and the admin middleware 
adminTaskRouter.use(authMiddleware, adminMiddleware)
