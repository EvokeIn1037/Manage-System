import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';

dotenv.config();

const {
  DB_USER: user,
  DB_PASSWORD: pass,
  DB_HOST: host,
  DB_DATABASE: database,
} = process.env;

const uri = `mongodb+srv://${encodeURIComponent(user)}:${encodeURIComponent(pass)}@${host}/?retryWrites=true&w=majority&appName=manage-system`;;
const client = new MongoClient(uri);

let dbInstance = null;

export async function connectDB() {
  if (dbInstance) {
    return dbInstance;
  }

  try {
    await client.connect();
    console.log('✅ MongoDB connected to', database);
    dbInstance = client.db(database);
    return dbInstance;
  } catch (err) {
    console.error('❌ MongoDB connection error:', err);
    throw err;
  }
}
