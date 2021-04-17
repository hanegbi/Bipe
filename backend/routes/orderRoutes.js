import express from 'express';
const router = express.Router();
import {
    addOrderItems,
    getOrderById,
    getMyOrders,
    getOrders,
    getUsersGraph,
} from '../controllers/orderController.js';
import { protect, admin } from '../middleware/authMiddleware.js';

router.route('/').post(protect, addOrderItems).get(protect, admin, getOrders);
router.route('/myorders').get(getMyOrders);
router.route('/usersgraph').get(protect, getUsersGraph);
router.route('/:id').get(protect, getOrderById);

export default router;
