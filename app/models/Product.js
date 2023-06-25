import pool from "../config/database.js";

class Product {
    constructor(productCode,
                name,
                description,
                idProductCategoryFK,
                idProductUnityFK,
                taxablePrice,
                taxExemptPrice,
                salePrice,
                images,
                status,
                elaborationDate,
                expirationDate)
    {
        this.productCode = productCode;
        this.name = name;
        this.description = description;
        this.idProductCategoryFK = idProductCategoryFK;
        this.idProductUnityFK = idProductUnityFK;
        this.taxablePrice = taxablePrice;
        this.taxExemptPrice = taxExemptPrice;
        this.salePrice = salePrice;
        this.images = images;
        this.status = status;
        this.elaborationDate = elaborationDate;
        this.expirationDate = expirationDate;
    }

    async getProducts (req, res) {
        try {
            const product = await pool.query("SELECT * FROM productBatch")
            return res.status(200).json(product);
        }
        catch (error) {
            console.log(error)
            return res.status(400).json({
                msg: 'Algo ha salido mal.'
            })
        }
    }

}

export default Product;