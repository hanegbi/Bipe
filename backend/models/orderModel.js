const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const orderSchema = new Schema({
    user: { type: Schema.Types.ObjectId, ref: "User" },
    price: Number,
    shippingAddress: String,
    orderedProducts: [
        { quantity: Number, type: Schema.Types.ObjectId, ref: "Product" },
    ],
});

module.exports = mongoose.model("Order", orderSchema);
