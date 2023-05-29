import express from 'express';
import {protect} from '../middleware/authMiddleware.js';
import {
  authUser, register, logout, getUserProfile, updateUserProfile
,addToFavorite, getFavoriteProducts } from '../controllers/userController.js';

const router = express.Router();
 
router.post('/', register);
router.post('/auth', authUser);
router.post('/logout', logout);
router.get('/profile', protect,getUserProfile);
router.put('/profile', protect, updateUserProfile);
router.put('/favorite', protect, addToFavorite)
router.get('/favorite', protect, getFavoriteProducts)

export default router;