import { appError } from "../errors/appError.js";
import {
  findAllTasks,
  updateTaskStatus,
} from "../repositories/admin.task.repository.js";

const TASK_STATUS = ["OPEN", "IN_PROGRESS", "RESOLVED"];

// Get admin tasks (search and filter functionality)
export async function getAdminTasks(query) {
  const search = query.search?.trim() || undefined;
  const status = query.status?.trim() || undefined;

  if (status && !TASK_STATUS.includes(status)) {
    throw new appError(400, "Status must be OPEN, IN_PROGRESS, or RESOLVED!");
  }

  const tasks = await findAllTasks({ search, status });
  return {
    tasks,
  };
}

// Service logic for the admin to update the task status
export async function updateAdminTaskStatus(taskId, status) {
  if (typeof status !== "string" || !TASK_STATUS.includes(status)) {
    throw new appError(400, "Status must be OPEN, IN_PROGRESS, or RESOLVED!");
  }

  const task = await updateTaskStatus(taskId, status);
  if (!task) {
    throw new appError(404, "Task not found!");
  }
  return task;
}
