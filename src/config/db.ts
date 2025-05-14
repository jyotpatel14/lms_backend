//db.ts

import { createPool } from "mysql2/promise";

import dotenv from "dotenv";

dotenv.config();

const pool = createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  connectionLimit: 10,
});

pool
  .getConnection()
  .then(() => console.log("Database connected successfully"))
  .catch((err) => console.error("Database connection failed:", err));

export default pool;
