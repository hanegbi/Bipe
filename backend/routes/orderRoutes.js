import express from 'express';
const router = express.Router();
import { addOrderItems, getOrderById, getMyOrders, getOrders, getUsersGraph } from "../controllers/orderController.js";
import { protect } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/usersgraph").get(protect, getUsersGraph);
router.route("/:id").get(protect, getOrderById);

export default router;