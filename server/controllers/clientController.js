import Products from "../models/Products.js";
import ProductStat from "../models/ProductStat.js";
import Transaction from "../models/Transactions.js";
import User from "../models/User.js";
import getCountryIso3 from "country-iso-2-to-3";

// get products controller logic here

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

// get customer controller login
export const getCumtomers =  async (req , res)=> {
    try {
        const cumtomers = await User.find({ role: "user"}).select("-password");
        res.status(200).json(cumtomers);
    } catch (error) {
        res.status(404).json({message: error.message })
    }
}

// get transaction login here
export const getTransactions = async (req, res) => {
    try {
      // sort should look like this: { "field": "userId", "sort": "desc"}
      const { page = 1, pageSize = 20, sort = null, search = "" } = req.query;
  
      // formatted sort should look like { userId: -1 }
      const generateSort = () => {
        const sortParsed = JSON.parse(sort);
        const sortFormatted = {
          [sortParsed.field]: (sortParsed.sort = "asc" ? 1 : -1),
        };
  
        return sortFormatted;
      };
      const sortFormatted = Boolean(sort) ? generateSort() : {};
  
      const transactions = await Transaction.find({
        $or: [
          { cost: { $regex: new RegExp(search, "i") } },
          { userId: { $regex: new RegExp(search, "i") } },
        ],
      })
        .sort(sortFormatted)
        .skip(page * pageSize)
        .limit(pageSize);
  
      const total = await Transaction.countDocuments({
        name: { $regex: search, $options: "i" },
      });
  
      res.status(200).json({
        transactions,
        total,
      });
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  };



export const getGeography = async (req, res) => {
    try {
      const users = await User.find();
  
      const mappedLocations = users.reduce((acc, { country }) => {
        const countryISO3 = getCountryIso3(country);
        if (!acc[countryISO3]) {
          acc[countryISO3] = 0;
        }
        acc[countryISO3]++;
        return acc;
      }, {});
  
      const formattedLocations = Object.entries(mappedLocations).map(
        ([country, count]) => {
          return { id: country, value: count };
        }
      );
  
      res.status(200).json(formattedLocations);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
};
  