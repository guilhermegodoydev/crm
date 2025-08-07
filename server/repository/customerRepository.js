import { pool } from "../db/db.js";

export const selectAll = async () => {
  const res = await pool.query("SELECT * FROM customer");
  //return res.rows;
  console.log(res.rows);
};

export const selectById = async (id) => {
  const res = await pool.query(`SELECT * FROM customer WHERE id = ${id}`);
  return res.rows;
};

export const create = async (
  name,
  email,
  phone,
  address,
  source,
  description
) => {
  const res = await pool.query(
    `INSERT INTO customer(name,email,phone,address,source,created_at,description) VALUES ($1,$2,$3,$4,$5,now(),$6)`,
    [name, email, phone, address, source, description]
  );
  console.log(res.rows);
};

export const update = async (
  id,
  name,
  email,
  phone,
  address,
  source,
  description
) => {
  const res = await pool.query(
    `UPDATE customer SET name = $1, email = $2, phone = $3, address = $4, source = $5, description = $6 WHERE id = $7`,
    [name, email, phone, address, source, description, id]
  );
  return res.rows;
};

export const patch = async (id, propName, propNewValue) => {
  const allowedFields = [
    "name",
    "email",
    "phone",
    "address",
    "source",
    "description",
  ];
  if (!allowedFields.includes(propName)) {
    throw new Error("Campo inválido para atualização");
  }

  const res = await pool.query(
    `UPDATE customer SET ${propName} = $1 WHERE id = $2 RETURNING *`,
    [propNewValue, id]
  );
  return res.rows;
};
