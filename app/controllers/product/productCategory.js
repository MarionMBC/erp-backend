import pool from "../../config/database.js";
import {error500} from "../../utils/statusList.js";
import {json} from "express";

export const getProductCategories = async (req, res) => {
    try {
        const [productCategory] = await pool.query('SELECT * FROM productCategories');
        return res.status(200).json(productCategory);
    } catch (e) {
        return error500(500, res, 'Algo ha salido mal', e);
    }
}

export const getProductCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const [product] = await pool.query('SELECT * FROM productCategories WHERE id=?', [id]);
        return product.length > 0 ? res.status(200).json(product) : res.status(404).json({msg: 'No se ha encontrado la categoría de producto.'})
    } catch (e) {
        return error500(500, res, 'Algo ha salido mal', e);
    }
}


export const updateProductCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const {name, status} = req.body;
        console.log(status)
        const [productCategory] = await pool.query('UPDATE productCategories set name = IFNULL(?, name), status = IFNULL(?, status) where id = ?', [name, status, id])
        const [productCategoryUpdated] = await pool.query('SELECT * FROM productCategories where id=?', [id]);
        return productCategory.affectedRows > 0 && productCategoryUpdated.length > 0 ?
            res.status(200).json({
                mgs: 'Se ha modificado el la categoría de producto correctamente.',
                updateProductCategory
            }) : res.status(404).json({
                msg: 'No se ha encontrado la categoría de producto.'
            })

    } catch (e) {
        return error500(500, res, 'Algo ha salido mal', e);
    }
}

export const deleteProductCategory = async (req, res) => {
    try {
        const id = req.params.id;
        const [productCategory] = await pool.query('SELECT * FROM productCategories')
    } catch (e) {
    }
}