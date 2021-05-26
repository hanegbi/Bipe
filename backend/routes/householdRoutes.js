import express from "express";
const router = express.Router();
import { createHousehold } from "../controllers/householdController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

// todo: add admin protection
router.route("/").post(createHousehold);

export default router;
