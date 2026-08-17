import { appError } from "../errors/appError.js";
import {
  createTask,
  fetchTaskByUserId,
  findTaskByIdAndUserId,
} from "../repositories/user.task.repository.js";

// Function to validate the title
function validateTitle(title) {
  if (typeof title !== "string" || !title.trim()) {
    throw new appError(400, "Title is required");
  }

  const trimmedTitle = title.trim();

  if (trimmedTitle.length > 100) {
    throw new appError(
      400,
      "Title must be less than or equal to 100 characters!"
    );
  }

  return trimmedTitle;
}

// Function to create a task
export async function createUserTask(userId, title) {
  const validTitle = validateTitle(title);

  return createTask(userId, validTitle);
}

// Function to get all the user tasks
export async function getUserTasks(userId) {
  return fetchTaskByUserId(userId);
}

// Fucntion to get the user task by the taskId
export async function getUserTaskById(userId, taskId) {
  const task = await findTaskByIdAndUserId(userId, taskId);

  if (!task) {
    throw new appError(400, "Task not found!");
  }
  return task;
}

// Fucntion to edit the task by taskId of a particular user
export async function updateUserTask(user_id, taskID, title) {
  const validTitle = validateTitle(title);
  const task = updateTaskTitle();
}
