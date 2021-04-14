import express from "express";
import asyncHandler from "express-async-handler";
import {
    deleteProduct,
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
} from "../controllers/productController.js";
const router = express.Router();
import { protect, admin } from "../middleware/authMiddleware.js";
import Product from "../models/productModel.js";

router.route("/").get(getProducts).post(protect, admin, createProduct);

router
    .route("/:id")
    .get(getProductById)
    .delete(protect, admin, deleteProduct)
    .put(protect, admin, updateProduct);

// @desc    Fetch single product
// @route   Get /api/products/:id
// @access  Public
router.get(
    "/:id",
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);
        if (product) {
            res.json(product);
        }
    })
);

// @desc    Post single product
// @route   Post /api/products
// @access  Public
router.post(
    "/",
    asyncHandler(async (req, res) => {
        const product = new Product({
            name: req.body.name,
            price: req.body.price,
            image: req.body.image,
            category: req.body.category,
            description: req.body.description,
        });

        const createdProduct = await product.save();
        res.status(201).json(createdProduct);
    })
);

// @desc    Delete single product
// @route   Delete /api/products/:id
// @access  Private/Admin
router.delete(
    "/:id",
    asyncHandler(async (req, res) => {
        const product = await Product.findById(req.params.id);

        if (product) {
            await product.remove();
            res.json({ message: "Product removed" });
        } else {
            res.status(404);
            throw new Error("Product not found");
        }
    })
);

export default router;
