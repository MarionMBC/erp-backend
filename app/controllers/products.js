import pool from "../config/database.js";

const getProducts = async (req, res) => {
    try {
        const products = await pool.query("SELECT * FROM productBatch")
        res.json(products)
    }
    catch (error) {
        console.log(error)
    }

}


export {
    getProducts
}