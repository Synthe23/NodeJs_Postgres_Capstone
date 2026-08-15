import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { createUserTask, getUserTasks } from "../services/user.task.service.js";

export const userTaskRouter = Router();

// If we want to protect the routes in the task router with the authMiddleware then we can use the
// userTaskRouter.use(authMiddleware) or else we can manually put the authMiddleware in each route

// Create a task middleware
userTaskRouter.post("/", authMiddleware, async (req, res, next) => {
  try {
    const task = await createUserTask(req.user.userId, req.body.title);
    res.status(201).json({
      success: true,
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Route to get the user tasks
userTaskRouter.get("/", authMiddleware, async (req, res, next) => {
  try {
    const tasks = await getUserTasks(req.user.userId);
    return res.status(200).json({
      success: true,
      data: {
        tasks
      }
    });
  } catch (error) {
    next(error);
  }
});
