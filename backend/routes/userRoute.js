import express from 'express';
import {protect} from '../middleware/authMiddleware.js';
import {
  authUser, register, logout, getUserProfile, updateUserProfile } from '../controllers/userController.js';

const router = express.Router();
 
router.post('/', register);
router.post('/auth', authUser);
router.post('/logout', logout);
router.get('/profile', protect,getUserProfile);
router.put('/profile', protect, updateUserProfile);

export default router;