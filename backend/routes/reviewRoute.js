import express from 'express';
import {protect} from '../middleware/authMiddleware.js';
import { createReview, getReview } from '../controllers/reviewController.js';

const router = express.Router();

router.post('/', protect, createReview);
router.get('/:id', protect, getReview);


export default router;