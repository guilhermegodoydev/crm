import { pool } from "../db/db.js";

export const selectAll = async () => {
  try {
    const res = await pool.query("SELECT * FROM customer");
    return res.rows;
  } catch (error) {
    console.error("Erro ao buscar usuarios", error);
    throw error;
  }
};
