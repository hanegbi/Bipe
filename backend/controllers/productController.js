import asyncHandler from "express-async-handler";
import Product from "../models/productModel.js";

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    let pageSize = 40;
    let page = Number(req.query.pageNumber) || 1;
    let cityId = req.query.cityId;
    let category = req.query.category
        ? {
              category: {
                  $regex: req.query.category === "Categories" ? "" : req.query.category,
                  $options: "i",
              },
          }
        : {};
    let keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: "i",
              },
          }
        : {};

    let count = await Product.countDocuments({ ...category, ...keyword });
    let products = await Product.find({ ...category, ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1));
    if (cityId == "null" || cityId == "") {
        res.json({ products, page, pages: Math.ceil(count / pageSize) });
    }

    const variants = [];

    for (let product of products) {
        // const variant = getVariantByCityId(product, cityId);
        // variants.push(variant);
        for (let location of product.locations) {
            if (location.cityId !== cityId) continue;
            const variant = {
                _id: product._id,
                name: product.name,
                barcode: product.barcode,
                image: product.image,
                category: product.category,
                countInStock: product.countInStock,
                description: product.description,
                price: location.minPrice,
            };
            variants.push(variant);
        }
    }
    res.json({ products: variants, page, pages: Math.ceil(count / pageSize) });
});

// const getVariantByCityId = (product, cityId) => {
//     for (let location of product.locations) {
//         if (location.cityId !== cityId) continue;
//         return {
//             _id: product._id,
//             name: product.name,
//             barcode: product.barcode,
//             image: product.image,
//             category: product.category,
//             countInStock: product.countInStock,
//             description: product.description,
//             price: location.minPrice,
//         };
//     }
// };

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);
    const cityId = req.params.cityId;

    if (!product) {
        res.status(404);
        throw new Error("Product not found");
    }

    for (let location of product.locations) {
        if (location.cityId !== cityId) continue;
        const variant = {
            _id: product._id,
            name: product.name,
            barcode: product.barcode,
            image: product.image,
            category: product.category,
            countInStock: product.countInStock,
            description: product.description,
            price: location.minPrice,
        };
        res.json(variant);
    }
});

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id);

    if (product) {
        await product.remove();
        res.json({ message: "Product removed" });
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: req.query.name,
        price: req.query.price,
        user: req.user._id,
        image:
            req.query.image === ""
                ? "https://i.dlpng.com/static/png/6389403_preview.png"
                : req.query.image,
        brand: req.query.brand,
        category: req.query.category,
        countInStock: req.query.countinstock,
        description: req.query.description,
    });

    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
});

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } = req.body;

    const product = await Product.findById(req.params.id);

    if (product) {
        product.name = name;
        product.price = price;
        product.description = description;
        product.image = image;
        product.brand = brand;
        product.category = category;
        product.countInStock = countInStock;

        const updatedProduct = await product.save();
        res.json(updatedProduct);
    } else {
        res.status(404);
        throw new Error("Product not found");
    }
});

export { getProducts, getProductById, deleteProduct, createProduct, updateProduct };
