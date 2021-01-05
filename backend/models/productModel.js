const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: String,
    price: Number,
    image: String,
    category: [String],
    description: String,
});

module.exports = mongoose.model("Product", productSchema);
