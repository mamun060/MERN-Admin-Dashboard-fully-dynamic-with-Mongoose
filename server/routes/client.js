import express  from "express";
import { getProducts } from "../controllers/clientController.js";

const router = express.Router();

// client route write here
router.get("/products", getProducts);


export default router;