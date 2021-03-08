import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: 'User' },
  price: Number,
  shippingAddress: String,
  orderedProducts: [
    { quantity: Number, type: Schema.Types.ObjectId, ref: 'Product' },
  ],
});

const Order = mongoose.model('Order', orderSchema);

export default Order;
