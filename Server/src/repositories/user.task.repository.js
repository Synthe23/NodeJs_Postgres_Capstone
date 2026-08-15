import { title } from "node:process";
import { pool } from "../lib/db.js";

// Query to create the task of the user
export async function createTask(userId, title) {
  const result = pool.query(
    `
        INSERT INTO support_tasks(title, user_id)
        VALUES($1, $2)
        RETURNING id, title, status, user_id, created_at, updated_at
        `,
    [title, userId]
  );
  return (await result).rows[0];
}

// get the tasks of the user by the userId
export async function fetchTaskByUserId(userId) {
  const result = await pool.query(
    `
    SELECT id, status, title, user_id, created_at, updated_at
    FROM support_tasks
    WHERE user_id = $1
    ORDER BY created_at DESC;
    `,
    [userId]
  );

  return result.rows;
}
