import pool from "../config/database.js";
import {err400, succes200} from "../utils/statusList.js";

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
                expirationDate) {
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

    async getProducts(req, res) {
        try {
            const product = await pool.query("SELECT * FROM productBatch")
            return res.status(200).json(product);
        } catch (error) {
            res.status(400).json(err400())
        }
    }

    async getProduct(req, res) {
        const id = req.params.id;
        try {
            const [product] = await pool.query('Select * from products where id = ?', [id])
            return res.send(product)
        } catch (error) {
            console.log(error);
            return res.status(400).json(err400())
        }
    }

    async addProduct(req, res) {
        try {
            const {
                productCode,
                name,
                description,
                idProductCategoryFK,
                idProductUnityFK,
                taxablePrice,
                taxEmptyPrice,
                salePrice,
                images,
                status,
                elaborationDate,
                expirationDate,
                createdAt,
                updatedAt
            } = req.body;
            await pool.query(
                'INSERT INTO PRODUCTS VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
                [
                    productCode,
                    name,
                    description,
                    idProductCategoryFK,
                    idProductUnityFK,
                    taxablePrice,
                    taxEmptyPrice,
                    salePrice,
                    images,
                    status,
                    elaborationDate,
                    expirationDate,
                    createdAt,
                    updatedAt
                ])
            return res.status(200).json(succes200('Prodducto agregado correctamente'))
        } catch (e) {
            console.log(e);
            return res.status.json('Error al insertar el producto')
        }
    }

}

export default Product;