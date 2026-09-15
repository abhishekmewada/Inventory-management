
import express from"express";
import { getTransactions, purchaseProduct, restockProduct } from "../controllers/transactionController.js";

const router  = express.Router();

router.post("/purchase", purchaseProduct);
router.post("/restock", restockProduct);
router.get("/transactions", getTransactions);

export default router;