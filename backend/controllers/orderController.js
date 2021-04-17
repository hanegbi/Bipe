import asyncHandler from 'express-async-handler';
import Order from '../models/orderModel.js';

// @desc    Create new order
// @route   POST /api/orders
// @access  Private
const addOrderItems = asyncHandler(async (req, res) => {
    const {
        orderItems,
        shippingAddress,
        itemsPrice,
        taxPrice,
        shippingPrice,
        totalPrice,
    } = req.body;

    if (orderItems && orderItems.length === 0) {
        res.status(400);
        throw new Error('No order items');
    } else {
        const order = new Order({
            orderItems,
            user: req.user._id,
            shippingAddress,
            itemsPrice,
            taxPrice,
            shippingPrice,
            totalPrice,
        });

        const createdOrder = await order.save();
        res.status(201).json(createdOrder);
    }
});

// @desc    Get order by ID
// @route   GET /api/orders/:id
// @access  Private
const getOrderById = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id).populate(
        'user',
        'name email'
    );

    if (order) {
        res.json(order);
    } else {
        res.status(404);
        throw new Error('Order not found');
    }
});

// @desc    Get logged in user orders
// @route   GET /api/orders/myorders
// @access  Private
const getMyOrders = asyncHandler(async (req, res) => {
    const fromDate =
        req.query.fromdate || new Date('July 20, 69 00:20:18 GMT+00:00');
    const untilDate = req.query.untildate || Date().getTime();
    const minPrice = req.query.minprice || 0;
    const maxPrice = req.query.maxprice || Number.MAX_SAFE_INTEGER;

    const orders = await Order.find({
        user: req.user._id,
        createdAt: { $gte: fromDate, $lte: untilDate },
        totalPrice: { $gte: minPrice, $lte: maxPrice },
    });
    res.json(orders);
});

// @desc    Get All orders
// @route   GET /api/orders
// @access  Private/Admin
const getOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user', 'id name');
    res.json(orders);
});

// @desc    Get logged in user orders
// @route   GET /api/orders/usersgraph
// @access  Private
const getUsersGraph = asyncHandler(async (req, res) => {
    const orders = await Order.aggregate([
        {
            $project: {
                totalPrice: 1,
                'shippingAddress.city': 1,
            },
        },
        {
            $group: {
                _id: '$shippingAddress.city',
                Framework: {$first: '$shippingAddress.city'},
                Stars: {
                    $avg: '$totalPrice',
                },
            },
        },
    ]);
    res.json(orders);
});

export { addOrderItems, getOrderById, getMyOrders, getOrders, getUsersGraph };
