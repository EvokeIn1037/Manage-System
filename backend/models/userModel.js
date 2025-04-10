import db from '../config/db.js';

export const findByEmail = async (email) => {
  const [rows] = await db.query('SELECT * FROM users WHERE email = ?', [email]);
  return rows[0];
};

export const registerUser = async (email, name, password) => {
  const [rows] = await db.query('INSERT INTO users (email, password, icon, name) VALUES (?, ?, "", ?)', [email, password, name]);
  return rows;
};

export default {
  findByEmail,
  registerUser,
};
