import express  from "express";
import { getProducts , getCumtomers } from "../controllers/clientController.js";

const router = express.Router();

// client route write here
router.get("/products", getProducts);
router.get("/customers", getCumtomers);


export default router;