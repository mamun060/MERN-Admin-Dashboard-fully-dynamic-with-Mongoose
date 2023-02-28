import express  from "express";
import bodyParser from "body-parser";
import cors from "cors";
import mongoose from "mongoose";
import dotenv  from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import clientRoutes from './routes/client.js';
import generalRoutes from './routes/general.js';
import managementRoutes from './routes/management.js';
import salesRoutes from './routes/sales.js';


// data imports from data file 
import UserModel from "./models/User.js";
import Products from "./models/Products.js";
import ProductStat from "./models/ProductStat.js";
import Transaction from "./models/Transactions.js";

// dumy data insert from here
import {dataUser , dataProduct, dataProductStat, dataTransaction} from "./data/index.js";

// configuration setup 

dotenv.config();
const app =  express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }))
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use( cors());


// Routes setup 
app.use("/client", clientRoutes);
app.use("/general", generalRoutes);
app.use("/management", managementRoutes);
app.use("/sales", salesRoutes);

// Mongoose setup 
const PORT =  process.env.PORT || 9000;
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> {
    app.listen(PORT, ()=>{
        console.log(` Server Port listen is: ${PORT}`);
    })

    // Only Add Data one time
    // UserModel.insertMany(dataUser);
    // Products.insertMany(dataProduct);
    // ProductStat.insertMany(dataProductStat)
    // Transaction.insertMany(dataTransaction);

}).catch((error)=>{
    console.log(error);
})