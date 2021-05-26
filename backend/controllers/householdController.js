import asyncHandler from "express-async-handler";
import Household from "../models/householdModel.js";

// @desc    Create a household
// @route   POST /api/households
// @access  Public
const createHousehold = asyncHandler(async (req, res) => {
    const household = new Household({
        street: req.body.street,
        city: req.body.city,
        cityId: req.body.cityId,
        postalCode: req.body.postalCode,
        country: req.body.country,
        orders: [],
    });

    const createdHousehold = await household.save();
    res.status(201).json(createdHousehold);
});

// @desc    Get All households
// @route   GET /api/households
// @access  Public
const getHouseholds = asyncHandler(async (req, res) => {
    const households = await Household.find({});
    res.json(households);
});

export { createHousehold, getHouseholds };
