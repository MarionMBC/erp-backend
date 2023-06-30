import pool from "../../config/database.js";
import {err400, err500, succes200} from "../../utils/statusList.js";


const getProducts = async (req, res) => {
    try {
        const [product] = await pool.query("SELECT * FROM products")
        return res.status(200).json(product);
    } catch (error) {
        res.status(400).json(err400())
    }
}

const getProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const [product] = await pool.query('Select * from products where id = ?', [id])
        return res.send(product)
    } catch (error) {
        console.log(error);
        return err400(res, 'Algo ha salido mal al obtener el producto');
    }
}

const addProduct = async (req, res) => {
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
        return succes200(res, 'Producto agregado correctamente');
    } catch (e) {
        console.log(e);
        return res.status(500).json(
            {
                error: 'Error al insertar el producto'
            }
        )
    }
}

const updateProduct = async (req, res) => {
    try {
        const id = req.params.id;
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
            expirationDate
        } = req.body;
        await pool.query('UPDATE PRODUCT productCode\n' +
            'name= IFNULL(?, name)\n' +
            'description = IFNULL(?, description)\n' +
            'idProductCategoryFK = IFNULL(?, idProductCategoryFK)\n' +
            'idProductUnityFK = IFNULL(?, idProductUnityFK)\n' +
            'taxablePrice = IFNULL(?, taxablePrice)\n' +
            'taxExemptPrice = IFNULL?, taxExemptPrice)\n' +
            'salePrice = IFNULL(?, salePrice)\n' +
            'images = IFNULL(?, images)\n' +
            'status = IFNULL(?, status)\n' +
            'elaborationDate = IFNULL(?, elaborationDate)\n' +
            'expirationDate = IFNULL(?, expirationDate)\n'
        ,
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
                expirationDate
            ])
        const [updatedProduct] =await pool.query('SELECT * FROM products WHERE ID=?', [id]);
        return res.status(200).json({
            msg: 'Se ha modificado el producto correctamente.',
            updatedProduct
        })
    } catch (e) {
        res.status(500).json({
            error: 'No se ha podido modificar el producto.'
        })
    }
}

const deleteProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const [product] = await pool.query ('DELETE FROM products WHERE id=?', [id]);
        product.affectedRows === 0 ? res.status(404).json({
            msg: 'No se ha encontrado el producto'
        }) : res.status(204).json({
            msg: 'El producto se eliminó correctamente'
        })

    } catch (e) {
        console.log({error: e});
        return res.status(500).json(
            {
                msg: 'No se ha podido eliminar el producto',
                error: e
            }
        )
    }
}

export {
    getProducts,
    getProduct,
    addProduct,
    updateProduct,
    deleteProduct
}