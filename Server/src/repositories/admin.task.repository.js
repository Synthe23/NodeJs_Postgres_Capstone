import { pool } from "../lib/db.js";

// Find all tasks with the status
// http://localhost:3000/api/admin/tasks?search=second&status=OPEN
export async function findAllTasks(filters) {
  const conditions = [];
  const values = [];

  let paramIndex = 1;

  if (filters.search) {
    conditions.push(`title ILIKE $${paramIndex}`);
    values.push(`%${filters.search}%`);
    paramIndex++;
  }
  if (filters.status) {
    conditions.push(`status = $${paramIndex}`);
    values.push(filters.status);
  }

  const whereClause =
    conditions.length > 0 ? `WHERE ${conditions.join(" AND ")}` : "";
  const result = await pool.query(
    `
    SELECT id, title, status, user_id, created_at, updated_at
    FROM support_tasks
    ${whereClause}
    ORDER BY created_at DESC
    `,
    values
  );
  return result.rows;
}

// Change the status of the user by the admin with the taskId
export async function updateTaskStatus(taskID, status) {
  const result = await pool.query(
    `
        UPDATE support_tasks
        SET status = $1, updated_at = NOW()
        WHERE id = $2
        RETURNING id, title, status, created_at, updated_at
        `,
    [status, taskID]
  );
  return result.rows[0];
}
