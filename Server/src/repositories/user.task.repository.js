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
