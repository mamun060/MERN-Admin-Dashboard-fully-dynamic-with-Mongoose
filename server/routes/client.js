import express  from "express";
import { getProducts , getCumtomers, getTransactions } from "../controllers/clientController.js";

const router = express.Router();

// client route write here
router.get("/products", getProducts);
router.get("/customers", getCumtomers);
router.get("/transactions", getTransactions)


export default router;