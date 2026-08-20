// Imports
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";

// Admin router
export const adminTaskRouter = Router();

// Used both the auth and the admin middleware
adminTaskRouter.use(authMiddleware, adminMiddleware);

//* Admin Route for getting all the tasks
adminTaskRouter.get("/", async (req, res, next) => {
  try {
    const data = await getAdminTasks(req.query);
    res.status(200).json({
      success: true,
      data,
    });
  } catch (error) {
    next(error);
  }
});
