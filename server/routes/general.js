import express  from "express";
import { getUser  } from '../controllers/generalController.js';

const router = express.Router();

router.get("/user/:id", getUser); 
// router.get("/dashboard", getDashboardStats);

export default router;