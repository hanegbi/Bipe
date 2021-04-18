import express from "express";
const router = express.Router();
import {
    addOrderItems,
    getOrderById,
    getMyOrders,
    getOrders,
    getUsersGraph,
    getOrdersGraph,
} from "../controllers/orderController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/").post(protect, addOrderItems).get(protect, admin, getOrders);
router.route("/myorders").get(protect, getMyOrders);
router.route("/ordersgraph").get(protect, getOrdersGraph);
router.route("/usersgraph").get(protect, getUsersGraph);
router.route("/:id").get(protect, getOrderById);

export default router;
