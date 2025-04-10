import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import authRoutes from './routes/authRoutes.js';
import dotenv from 'dotenv';
import authMiddleware from './middleware/authMiddleware.js'
import adminMiddleware from './middleware/adminMiddleware.js';

dotenv.config();

const app = express();
app.use(express.json());
app.use(cookieParser());

app.use(cors({
  // origin: 'http://localhost:5173',
  origin: 'http://192.168.0.43:5173', // test on Linux
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  credentials: true
}));

app.use('/api/auth', authRoutes);

app.get("/api/me", (req, res) => {
  authMiddleware(req, res);
});

app.get("/api/admin", (req, res) => {
  adminMiddleware(req, res);
});

const PORT = process.env.PORT || 9067;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
