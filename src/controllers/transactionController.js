
import mongoose from "mongoose";
 import Product from "../models/Product.js";
 import Transaction from "../models/Transaction.js";

export const purchaseProduct  = async( req, res, next) =>{
      const session = await mongoose.startSession();

      try {
        const { productId , quantity } = req.body;

        if(!productId || !mongoose.Types.ObjectId.isValid(productId)) {
            const error = new Error("Valid productId is  required");
            error.statusCode = 400;
            throw error;
        }

        if ( !Number.isInteger(quantity) || quantity <= 0) {
            const error  = new Error("Quantity must be greater than zero");
            error.statusCode = 400;
            throw error;
        }
        
        let updatedProduct;
        let transation;

        await session.withTransaction(async() => {
            updatedProduct = await Product.findOneAndUpdate(
                {
                    _id: productId,
                    stoc: { $gte: quantity},
                },
                {
                    $inc: { stock: -quantity },
                },
                {
                    new: true,
                    session,
                }
            );
            if( !updatedProduct) {
                const porductExists = await Product.exists({
                    _id: productId,
                }).session(session);

                if (!productExists) {
                    const error = new Error("Product not found");
                    error.statusCode = 404;
                    throw error;
                }

                const error  = new Error("Insufficiant stock");
                error.statusCode = 400;
                throw error;
            }

            // create transation record
            [transaction] = await Transaction.create(
                [
                    {
                        productId,
                        type: "purchase",
                        quantity,
                    },
                ],
                { session }
            );
        });

        res.status(200).json({
            success: true,
            message: "Purchase successfully",
            data: {
                product: updatedProduct,
                transation,
            },
        })

      } catch (error) {
        next(error)
      } finally {
        await session.endSession();
      }
};


// Restock product
 export const restockProduct = async ( req, res, next ) => {
    const session = await mongoose.startSession();

    try {
        const { productId, quantity } = req.body;

        if( !productId || !mongoose.Types.ObjectId.isValid(productId)){
            const error = new Error("Valid ProducId is require");
            error.statusCode = 400;
            throw error;
        }

        if (!Number.isInteger(quantity) || quantity <= 0) {
            const error = new Error("Quantity must be greater than zero")
            error.statusCode = 400;
            throw error;
        }
        let updatedProduct;
        let transaction;

        await session.withTransaction(async () => {
            // increase stock
            updatedProduct = await Product.findByIdAndUpdate(
                productId,
                {
                    $inc: { stock: quantity},
                },
                { 
                    new: true,
                    session,
                }
            );

            if (!updatedProduct) {
                 const error = new Error("porduct not found")
                 error.statusCode = 404;
                 throw error;
            }

            // create transation record
            [transaction] = await Transaction.create(
                [
                    {
                        productId,
                        type: "restock",
                        quantity,
                    },
                ],
                {session}
            )
        });

        res.status(200).json({
            success: true,
            message: "Restock successfully",
            data: {
                product: updatedProduct,
                transaction,
            }
        })
        
    } catch (error) {
        next(error);

    } finally { await session.endSession();

    }
}

// get All transactions 
export const getTransactions = async (req, res, next) => {
    try {
        const transactions = await Transaction.find()
        .populate("productId", "name price ") 
        .sort({ createdAt: -1});

        res.status(200).json({
            success: true,
            count: transactions.length,
            data: transactions,
        })
    } catch (error) {
        next(error);
    }
}