import mongoose from "mongoose";
// import Product from "./Product";
import Product from "./Product.js"

const transactionSchema = new mongoose.Schema(
    {
        productId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
        },

        type: {
            type: String,
            enum: [ "purchase", "restock"],
            required: true,
        },

        quantity: {
            type: Number,
            required: true,
            min: [1, "Quantity must be greater than zero"]
        },
    },

    { 
        timestamps:true,

    }
)

const Transaction = mongoose.model("Transition", transactionSchema);
export default Transaction;