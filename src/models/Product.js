import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
    {
        name:{
            type: String,
            required: [ true, "Product name is required"],
            unique: true,
            trim: true,
        },

        price:{
            type: Number,
            required: [ true, "Product price is required"],
            min: [0.01, "price must be grater than zero"],
        },

        stock:{
            type: Number,
            required: [ true, "product storck is required"],
            min: [0, "Stock cannot be negative"],
            default: 0,
        }
    },
    {
        timestamps: true,

    }
);

const Product = mongoose.model("Product", productSchema);
export default Product;