import { pool } from "../lib/db.js";

// Find the user by email
export async function findUserByEmail(email) {
  const result = await pool.query(
    `
    SELECT
      id,
      email,
      password_hash,
      role,
      created_at
    FROM users
    WHERE email = $1
    `,
    [email]
  );

  return result.rows[0] ?? null;
}

// Create user in the database
export async function createUser(email, passwordHash) {
  const result = await pool.query(
    `
    INSERT INTO users (email, password_hash)
    VALUES ($1, $2)
    RETURNING id, email, role, created_at
    `,
    [email, passwordHash]
  );

  return result.rows[0];
}