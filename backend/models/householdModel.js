import mongoose from "mongoose";
const Schema = mongoose.Schema;

const household = new Schema({
    street: { type: String, required: true },
    city: { type: String, required: true },
    postalCode: { type: String, required: true },
    country: { type: String, required: true },
    orders: [
        {
            date: {
                type: String,
                default: new Date().toISOString().slice(0, 10),
            },
            list: [
                {
                    type: mongoose.Schema.Types.ObjectId,
                    required: false,
                    ref: "Order",
                },
            ],
        },
    ],
});

const Household = mongoose.model("Household", household);

export default Household;
