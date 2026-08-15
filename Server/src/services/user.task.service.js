import { appError } from "../errors/appError.js";
import { createTask, fetchTaskByUserId } from "../repositories/user.task.repository.js";

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

export async function getUserTasks(userId){
  return fetchTaskByUserId(userId);
}