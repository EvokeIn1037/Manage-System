import express from 'express';
const router = express.Router();
import { signIn } from '../controllers/authController.js';

router.post('/signin', signIn);

export default router;
