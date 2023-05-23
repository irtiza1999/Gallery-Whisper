import mongoose from "mongoose";

const productSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique:true
    },
    description: {
        type: String,
        required: true,
    },
    category: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        default: 0,
        required: true,
    },
    countInStock: {
        type: Number,
        default: 0,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },

},{
    timestamps: true
});


const Product = mongoose.model("Product", productSchema);

export default Product;