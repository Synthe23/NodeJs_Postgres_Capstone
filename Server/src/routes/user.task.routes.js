import { Router } from "express";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import {
  createUserTask,
  getUserTasks,
  getUserTaskById,
  updateUserTask,
  deleteUserTask,
} from "../services/user.task.service.js";

export const userTaskRouter = Router();

// If we want to protect the routes in the task router with the authMiddleware then we can use the
// userTaskRouter.use(authMiddleware) or else we can manually put the authMiddleware in each route

// Create a task route
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
        tasks,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Route to get the single task of the user from the user and the task ID.
userTaskRouter.get("/:taskId", authMiddleware, async (req, res, next) => {
  try {
    const task = await getUserTaskById(req.user.userId, req.params.taskId);
    res.status(200).json({
      success: true,
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Update the contents of a task by taskID
userTaskRouter.patch("/:taskId", authMiddleware, async (req, res, next) => {
  try {
    const task = await updateUserTask(
      req.user.userId,
      req.params.taskId,
      req.body.title
    );

    return res.status(200).json({
      success: true,
      data: {
        task,
      },
    });
  } catch (error) {
    next(error);
  }
});

// Delete the task from the task and the userID
userTaskRouter.delete("/:taskId", authMiddleware, async (req, res, next) => {
  try {
    await deleteUserTask(req.user.userId, req.params.taskId);

    return res.status(200).json({
      success: true,
      message: `Successful deletion of the task!`,
    });
  } catch (error) {
    next(error);
  }
});
