import pg from "pg";
import dotenv from "dotenv";
dotenv.config();

const Pool = pg.Pool;
const pool = new Pool({
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  host: process.env.DB_HOST || "db",
  port: parseInt(process.env.DB_PORT||"") || 5432,
  database: process.env.DB_NAME || "test_db",
});


export default pool;
