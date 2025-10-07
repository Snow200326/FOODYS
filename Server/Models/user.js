import mongoose from "mongoose";

const schem = new mongoose.Schema({
    _id: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    image: { type: String, required: true },
    role: { type: String, enum: ["user", "owner"], required: true },
    cartData: { type: String, default: {} },
}, {
    timestamps: true, minimize: false

})
const User = mongoose.model("User",schem)

export default User;