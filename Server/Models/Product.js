import mongoose from "mongoose";

const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Object, required: true },
    sizes: { type: String, required: true },
    Images: { type: String, required: true },
    Category: { type: Object, required: true },
    type: { type: Object, required: true },
    popular: { type: Boolean, default: false },
    instock: { type: Boolean, default: true },
}, {
    timestamps: true,
});

const Product = mongoose.model("Product", ProductSchema);

export default Product;
