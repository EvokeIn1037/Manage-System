import { connectDB } from '../config/db.js';

export const findByEmail = async (email) => {
  const db = await connectDB();

  return db
    .collection('users')
    .findOne({ email });
};

export const registerUser = async (email, name, password) => {
  const db = await connectDB();
  const now = new Date();

  const { acknowledged, insertedId } = await db
    .collection('users')
    .insertOne({ email, name, password, createdAt: now });

  if (!acknowledged) {
    throw new Error('Failed to insert user');
  }

  // return the newly created document
  return db.collection('users').findOne({ _id: insertedId });
};

export default {
  findByEmail,
  registerUser,
};
