import pg from "pg";
const Pool = pg.Pool;

const pool = new Pool({
  user: "root",
  password: "root",
  host: "localhost",
  port: 5432,
  database: "test_db",
});

export default pool;