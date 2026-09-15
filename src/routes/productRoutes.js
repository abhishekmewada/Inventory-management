import { createProduct, getProducts } from "../controllers/productController.js";
import express from "express"

const router = express.Router();

router.post("/", createProduct);
router.get("/", getProducts);

export default router;