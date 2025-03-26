import pg from "pg";
import {
  DB_DATABASE,
  DB_HOST,
  DB_PASSWORD,
  DB_PORT,
  DB_USER,
} from "../confing.js";

export const pool = new pg.Pool({
  user: DB_USER,
  host: DB_HOST,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  port: DB_PORT,
});

pool
  .connect()
  .then((client) => {
    console.log("🟢 Conectado a PostgreSQL");
    client.release(); 
  })
  .catch((err) => {
    console.error("🔴 Error conectando a PostgreSQL:", err.message);
    process.exit(1); 
  });

export default pool;