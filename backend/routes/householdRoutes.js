import express from "express";
const router = express.Router();
import {
    addOrder,
    createHousehold,
    getHouseholds,
    getHouseholdByCityId,
    getHouseholdOrders,
} from "../controllers/householdController.js";

router.route("/:id").get(getHouseholdByCityId).post(addOrder);
router.route("/orders/:groupOrderId").get(getHouseholdOrders);
router.route("/").get(getHouseholds).post(createHousehold);

export default router;
