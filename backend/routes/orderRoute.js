import express from 'express';
import {addOrderItems, getOrderById, updateOrderToPaid, updateOrderToDelivered} from '../controllers/orderController.js';
import {protect, admin} from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', protect, addOrderItems);
router.get('/:orderId', getOrderById);
router.put('/:orderId/pay', updateOrderToPaid);
router.put('/:orderId/deliver',protect, updateOrderToDelivered);
export default router;