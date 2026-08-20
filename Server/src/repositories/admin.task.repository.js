import { pool } from "../lib/db.js";

// Find all tasks with the status
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
