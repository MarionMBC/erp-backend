import pool from "../config/database.js";
import Product from "../models/Product.js";
import {json} from "express";

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

const getProduct = async (req, res) => {
    const product = new Product();
    try {
        return await product.getProduct(req, res)
    }
    catch (e) {
        return res.status(500).json(
            {
                msg: `Error: ${e}`
            }
        )
    }
}

export {
    getProducts,
    getProduct
}