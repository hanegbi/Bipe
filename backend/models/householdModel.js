import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const household = new Schema({
  name: String,
  users: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  owner: { type: Schema.Types.ObjectId, ref: 'User' },
  historyOrders: { type: Schema.Types.ObjectId, ref: 'Order' },
});

const Household = mongoose.model('Household', household);

export default Household;
