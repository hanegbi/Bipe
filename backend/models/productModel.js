import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const productSchema = new Schema({
  name: String,
  price: Number,
  image: String,
  category: [String],
  description: String,
});

const Product = mongoose.model('Product', productSchema);

export default Product;
