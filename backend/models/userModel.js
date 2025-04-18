import { connectDB } from '../config/db.js';

export const findByEmail = async (email) => {
  const db = await connectDB();

  return db
    .collection('users')
    .findOne({ email });
};

export const registerUser = async (email, name, password) => {
  const db = await connectDB();
  const icon = "";
  const isAdmin = false;

  // ⚠️ Must use snake_case created_at and is_admin to match your validator!
  const userDoc = {
    email: email,                       // string
    password: password,                    // string
    created_at: new Date(),      // Date object
    icon: icon,                        // string (e.g. "" or "avatar.png")
    name: name,                        // string
    is_admin: isAdmin,  // true/false
  };

  const { acknowledged, insertedId } = await db
    .collection('users')
    .insertOne(userDoc);

  if (!acknowledged) {
    throw new Error('Failed to insert user');
  }
  return insertedId;
};

export default {
  findByEmail,
  registerUser,
};
