import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import errorMiddleware from "./middleware/errorMiddleware.js";
import  productRoutes  from "./routes/productRoutes.js";
import transactionRoutes from "./routes/transactionRoutes.js"

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use("/api/products", productRoutes);
app.use("/api/products", transactionRoutes);

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Inventory management Api is running..."
    });
});

app.use(errorMiddleware);

export default app;