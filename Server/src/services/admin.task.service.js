import { appError } from "../errors/appError.js";
import { findAllTasks } from "../repositories/admin.task.repository.js";

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
