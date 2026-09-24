import { pool } from "../db/pool.js";

function mapProductRow(row) {
  return {
    id: row.id,
    name: row.name,
    description: row.description,
    price: Number(row.price),
    category: row.category,
    stock: row.stock,
    createdAt: row.created_at.toISOString(),
    updatedAt: row.updated_at.toISOString(),
  };
}

export async function getAllProducts(filters) {
  let query = "SELECT * FROM products WHERE 1=1";
  const values = [];

  if (filters.category) {
    values.push(filters.category);
    query += ` AND LOWER(category) = LOWER($${values.length})`;
  }

  if (filters.search) {
    values.push(`%${filters.search}%`);
    query += ` AND (LOWER(name) LIKE LOWER($${values.length}) OR LOWER(description) LIKE LOWER($${values.length}))`;
  }

  query += " ORDER BY id ASC";

  const result = await pool.query(query, values);
  return result.rows.map(mapProductRow);
}

export async function getProductById(id) {
  const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);

  if (result.rows.length === 0) {
    return null;
  }

  return mapProductRow(result.rows[0]);
}

export async function createProduct(input) {
  const result = await pool.query(
    `INSERT INTO products (name, description, price, category, stock)
     VALUES ($1, $2, $3, $4, $5)
     RETURNING *`,
    [input.name, input.description, input.price, input.category, input.stock]
  );

  return mapProductRow(result.rows[0]);
}

export async function updateProduct(id, input) {
  const existing = await getProductById(id);
  if (!existing) {
    return null;
  }

  const name = input.name ?? existing.name;
  const description = input.description ?? existing.description;
  const price = input.price ?? existing.price;
  const category = input.category ?? existing.category;
  const stock = input.stock ?? existing.stock;

  const result = await pool.query(
    `UPDATE products
     SET name = $1,
         description = $2,
         price = $3,
         category = $4,
         stock = $5,
         updated_at = CURRENT_TIMESTAMP
     WHERE id = $6
     RETURNING *`,
    [name, description, price, category, stock, id]
  );

  return mapProductRow(result.rows[0]);
}
