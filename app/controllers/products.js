import pool from "../config/database.js";
import Product from "../models/Product.js";

const getProducts = async (req, res) => {
    const product = new Product();
    try {
        return await product.getProducts(req, res)
    }
    catch (error) {
        console.log(error)
        res.status(400).json({
            msg: 'Algo ha salido mal.'
        })
    }


}


export {
    getProducts
}