import path from "node:path";
import fs from "node:fs";

import { pool } from "../lib/db.js";
import { logger } from "../lib/logger.js";

// cwd will give us the current working directory
const MIGRATION_DIR = path.join(process.cwd(), "migrations");

const CREATE_MIGRATIONS_TABLE_SQL = `
CREATE TABLE IF NOT EXISTS migrations (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL UNIQUE,
    executed_at TIMESTAMP NOT NULL DEFAULT NOW()
);
`;

/**
 * @typedef {Object} MigrationRow
 * @property {string} name
 */

async function getExecutedMigrations() {
  const result = await pool.query(
    "SELECT name FROM migrations ORDER BY name"
  );

  return result.rows.map((row) => row.name);
}

function getMigrationFiles() {
  return fs
    .readdirSync(MIGRATION_DIR)
    .filter((file) => file.endsWith(".sql"))
    .sort();
}

async function runMigration(fileName) {
  const sql = fs.readFileSync(
    path.join(MIGRATION_DIR, fileName),
    "utf-8"
  );

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    await client.query(sql);

    await client.query(
      "INSERT INTO migrations(name) VALUES($1)",
      [fileName]
    );

    await client.query("COMMIT");

    logger.info(`Migration Completed: ${fileName}`);
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

async function migrate() {
  await pool.query(CREATE_MIGRATIONS_TABLE_SQL);

  const executed = new Set(await getExecutedMigrations());

  const pending = getMigrationFiles().filter(
    (file) => !executed.has(file)
  );

  if (pending.length === 0) {
    logger.info("No pending migrations");
    return;
  }

  for (const fileName of pending) {
    await runMigration(fileName);
  }

  logger.info("All migrations completed!");
}

migrate()
  .catch((error) => {
    logger.error({ err: error }, "Migrations failed");
    process.exitCode = 1;
  })
  .finally(() => pool.end());