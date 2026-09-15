import Product from "../models/Product.js";

 export const createProduct = async ( req, res, next) => {
    try {
        const { name, price, stock } = req.body;

        const product = await Product.create({
            name,
            price,
            stock,
        });

        res.status(201).json({ success: true, message: "Product created successfully", data: product});
        
    } catch (error) {
        next(error);
    }
}

// get all product
 export const getProducts  = async (req, res, next) => {
    try {
        const products = await Product.find().sort({created: -1});

        res.status(200).json({
            success: true,
            count: products.length,
            data: products,
        });
    } catch (error) {
        next(error);
    }
};
