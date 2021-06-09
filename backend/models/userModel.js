import mongoose from "mongoose";
import bcrypt from "bcryptjs";
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: String,
    email: String,
    password: String,
    // homeAddress: {
    //     street: { type: String, required: true },
    //     city: { type: String, required: true },
    //     postalCode: { type: String, required: true },
    //     country: { type: String, required: true },
    // },
    // workAddress: {
    //     street: { type: String, required: true },
    //     city: { type: String, required: true },
    //     postalCode: { type: String, required: true },
    //     country: { type: String, required: true },
    // },
    hasGroup: Boolean,
    household: { type: Schema.Types.ObjectId, ref: "Household" },
    isAdmin: Boolean,
    isVerified: Boolean,
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword, this.password);
};

userSchema.pre("save", async function (next) {
    if (!this.isModified("password")) {
        next();
    }

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", userSchema);

export default User;
