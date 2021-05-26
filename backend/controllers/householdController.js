import asyncHandler from "express-async-handler";
import Household from "../models/householdModel.js";

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createHousehold = asyncHandler(async (req, res) => {
    const address = req.body.address;

    const household = new Household({
        address: {
            street: address.street,
            city: address.city,
            postalCode: address.postalCode,
            country: address.country,
        },
        orders: [],
    });

    const createdHousehold = await household.save();
    res.status(201).json(createdHousehold);
});

export { createHousehold };
