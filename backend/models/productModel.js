import mongoose from "mongoose";
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    image: String,
    category: String,
    countInStock: {
        type: Number,
        required: true,
        default: 0,
    },
    description: String,
    locations: [
        {
            cityId: String,
            branches: [
                {
                    id: String,
                    price: Number,
                },
            ],
            minPrice: Number,
        },
    ],
});

const Product = mongoose.model("Product", productSchema);

export default Product;
