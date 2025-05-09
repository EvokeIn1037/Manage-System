import express from 'express';
const router = express.Router();
import { detailbydate } from '../controllers/dataController.js';

router.get('/detailbydate', detailbydate);

export default router;
