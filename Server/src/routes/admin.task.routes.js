// Imports
import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { adminMiddleware } from "../middlewares/admin.middleware.js";
import {
  getAdminTasks,
  updateAdminTaskStatus,
} from "../services/admin.task.service.js";

// Admin router
export const adminTaskRouter = Router();

// Used both the auth and the admin middleware
adminTaskRouter.use(authMiddleware, adminMiddleware);

// Admin Route for getting all the tasks
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

// Admin route for admin to update the task status for a task
adminTaskRouter.patch("/:taskId/status", async (req, res, next) => {
  try {
    const task = await updateAdminTaskStatus(
      req.params.taskId,
      req.body.status
    );
    res.status(200).json({
      success: true,
      data: { task },
    });
  } catch (error) {
    next(error);
  }
});
