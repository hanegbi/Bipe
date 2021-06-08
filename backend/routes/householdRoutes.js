import express from "express";
const router = express.Router();
import {
    addOrder,
    createHousehold,
    getHouseholds,
    getHouseholdByCityId,
} from "../controllers/householdController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

router.route("/:id").get(getHouseholdByCityId).post(addOrder);
router.route("/").get(getHouseholds).post(createHousehold);

export default router;
