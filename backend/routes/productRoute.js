import express from 'express';
import {getProduct, createProduct, getProductById, updateProduct, deleteProduct, getUniqueCategories, getCategoryProducts} from '../controllers/productController.js';
import {protect} from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/category', getUniqueCategories);
router.get('/:productId', getProductById);
router.get('/', getProduct);
router.get('/category/:myCategory', getCategoryProducts);
router.post('/', protect, createProduct);
router.put('/:productId', protect, updateProduct);
router.delete('/:productId', protect, deleteProduct);



export default router;