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
    const households = await Household.find({}).populate("orders.list");
    res.json(households);
});

// @desc    Add Order ID to household orders list
// @route   POST /api/households/:id
// @access  Public
const addOrder = asyncHandler(async (req, res) => {
    const order = req.body.orderId;

    const household = await Household.findById(req.params.id);
    const today = new Date().toISOString().slice(0, 10);

    if (household.orders[household.orders.length - 1]?.date === today) {
        household.orders[household.orders.length - 1].list.push(order);
    } else {
        household.orders.push({ date: today, list: [order] });
    }
    const updatedHousehold = await household.save();
    res.json(updatedHousehold);
});

// @desc    Get household details by city id
// @route   GET /api/households/:id
// @access  Public
const getHouseholdByCityId = asyncHandler(async (req, res) => {
    const household = await Household.findOne({ cityId: req.params.id });
    res.json(household);
});

// @desc    Get orders by household order id
// @route   GET /api/households/orders/:groupOrderId
// @access  Public
const getHouseholdOrders = asyncHandler(async (req, res) => {
    const groupOrderId = req.params.groupOrderId;

    const households = await Household.find({}).populate("orders.list");

    for (let household of households) {
        for (let groupOrder of household.orders) {
            if (groupOrder._id != groupOrderId) continue;
            console.log(groupOrder._id);

            res.json(groupOrder.list);
        }
    }
    res.send([]);
});

export { createHousehold, getHouseholds, addOrder, getHouseholdByCityId, getHouseholdOrders };
