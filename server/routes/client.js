import express  from "express";
import { getProducts , getCumtomers, getTransactions, getGeography } from "../controllers/clientController.js";

const router = express.Router();

// client route write here
router.get("/products", getProducts);
router.get("/customers", getCumtomers);
router.get("/transactions", getTransactions)
router.get("/geography", getGeography)


export default router;