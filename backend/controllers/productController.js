import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all products
// @route   GET /api/products
// @access  Public
const getProducts = asyncHandler(async (req, res) => {
    const pageSize = 40
    const page = Number(req.query.pageNumber) || 1
    const cityId = req.query.cityId
    const category = req.query.category
        ? {
              category: {
                  $regex:
                      req.query.category === 'Categories'
                          ? ''
                          : req.query.category,
                  $options: 'i',
              },
          }
        : {}
    const keyword = req.query.keyword
        ? {
              name: {
                  $regex: req.query.keyword,
                  $options: 'i',
              },
          }
        : {}

    const count = await Product.countDocuments({ ...category, ...keyword })
    let products = await Product.find({ ...category, ...keyword })
        .limit(pageSize)
        .skip(pageSize * (page - 1))

        var needToDelete = true;
    
        for(var index = 0; index < products.length; index++){
            var locationsSize = products[index].locations.length;
            for(var locationIndex = 0; locationIndex < locationsSize; locationIndex++){
                    if(products[index].locations[locationIndex].cityId == "378"){
                        needToDelete = false;
                    }
                    else{
                        delete products[index].locations[locationIndex];
                        if(products[index].locations == null){
                            delete products[index].locations.key
                        }
                    }
                }
                
                // console.log(productsArray[index].name + " " + needToDelete)
                if(needToDelete == true){
                    delete products[index];
                }
                needToDelete = true;
        }
    
        products = JSON.parse(JSON.stringify(products, (k, v) => Array.isArray(v) ? v.filter(e => e !== null) : v, 2 ))
        // productResults = JSON.stringify(productResults)
    res.json({products, page, pages: Math.ceil(count / pageSize)})
    // res.send(products)
});

// @desc    Fetch single product
// @route   GET /api/products/:id
// @access  Public
const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        res.json(product)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Delete a product
// @route   DELETE /api/products/:id
// @access  Private/Admin
const deleteProduct = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)

    if (product) {
        await product.remove()
        res.json({ message: 'Product removed' })
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Create a product
// @route   POST /api/products
// @access  Private/Admin
const createProduct = asyncHandler(async (req, res) => {
    const product = new Product({
        name: req.query.name,
        price: req.query.price,
        user: req.user._id,
        image:
            req.query.image === ''
                ? 'https://i.dlpng.com/static/png/6389403_preview.png'
                : req.query.image,
        brand: req.query.brand,
        category: req.query.category,
        countInStock: req.query.countinstock,
        description: req.query.description,
    })

    const createdProduct = await product.save()
    res.status(201).json(createdProduct)
})

// @desc    Update a product
// @route   PUT /api/products/:id
// @access  Private/Admin
const updateProduct = asyncHandler(async (req, res) => {
    const { name, price, description, image, brand, category, countInStock } =
        req.body

    const product = await Product.findById(req.params.id)

    if (product) {
        product.name = name
        product.price = price
        product.description = description
        product.image = image
        product.brand = brand
        product.category = category
        product.countInStock = countInStock

        const updatedProduct = await product.save()
        res.json(updatedProduct)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})

export {
    getProducts,
    getProductById,
    deleteProduct,
    createProduct,
    updateProduct,
}
