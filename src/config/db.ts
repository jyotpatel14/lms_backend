import { Pool, PoolOptions } from "mysql2/promise";
import { createPool } from "mysql2/promise"; // Note: Import from promise version

// Explicit type for pool configuration
const poolConfig: PoolOptions = {
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
};

// Create typed pool instance
const pool: Pool = createPool(poolConfig);

export default pool;
