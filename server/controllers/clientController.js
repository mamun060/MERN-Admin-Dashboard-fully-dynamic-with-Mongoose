import Products from "../models/Products.js";
import ProductStat from "../models/ProductStat.js";


// write controller logic here

export const getProducts = async (req, res)=> {
    try {
        const products = await Products.find();

        const productWithStatus = await Promise.all(
            products.map( async( product )=>{
                const stat = await ProductStat.find({
                    productId: product._id,
                });
                return {
                    ...product._doc,
                    stat,
                };
            })
        );

        res.status(200).json(productWithStatus);

    } catch (error) {
        res.status(404).json({ message: error.message })
    }
}