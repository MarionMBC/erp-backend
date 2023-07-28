import pool from "../../config/database";
import { err500 } from "../../utils/statusList";

export const getProductBatchDetails = async (req, res) => {
    try {
        const [productBatchDetails] = await pool.query('SELECT * FROM productBatchDetails');
        return res.status(200).json(productBatchDetails);
    } catch (e) {
        return err500(500, res, 'Algo ha salido mal', e);
    }
}


export const getProductBatchDetail = async (req, res) => {
    try {
        const id = req.params.id;
        const [productBatchDetail] = await pool.query('SELECT * FROM productBatchDetails WHERE id=?', [id]);
        return productBatchDetail.length > 0 ? res.status(200).json(productBatchDetail) : res.status(404).json({ msg: 'No se ha encontrado el lote de producto.' })
    } catch (e) {
        return err500(500, res, 'Algo ha salido mal', e);
    }
}

export const createProductBatchDetail = async (req, res) => {
    try {
        const { idProductBatchFK, idProductFK, quantity } = req.body;
        const newProductBatchDetail = {
            idProductBatchFK,
            idProductFK,
            quantity
        }
        const [productBatchDetail] = await pool.query('INSERT INTO productBatchDetails SET ?', [newProductBatchDetail]);
        return res.status(200).json({ msg: 'Lote de producto creado correctamente.' });
    } catch (e) {
        return err500(500, res, 'Algo ha salido mal', e);
    }
}

export const updateProductBatchDetail = async (req, res) => {
    try {
        const id = req.params.id;
        const { idProductBatchFK, idProviderProductFK, pricePerUnit, productQuantity, totalPerUnit} = req.body;
        const updatedProductBatchDetail = {
            idProductBatchFK,
            idProviderProductFK,
            pricePerUnit,
            productQuantity,
            totalPerUnit
        }
        const [productBatchDetail] = await pool.query('UPDATE productBatchDetails SET ? WHERE id=?', [updatedProductBatchDetail, id]);
        return productBatchDetail.affectedRows > 0 ?
            res.status(200).json({
                msg: 'Se ha actualizado el lote de producto correctamente.',
                productBatchDetail
            }) : res.status(404).json({
                msg: 'No se ha encontrado el lote de producto.' 
            })
    } catch (error) {
        return err500(500, res, 'Algo ha salido mal', error);
    }

}


export const deleteProductBatchDetail = async (req, res) => {
    try {
        const id = req.params.id;
        const [productBatchDetail] = await pool.query('DELETE FROM productBatchDetails WHERE id=?', [id]);
        return productBatchDetail.affectedRows > 0 ?
            res.status(200).json({
                msg: 'Se ha eliminado el lote de producto correctamente.',
                productBatchDetail
            }) : res.status(404).json({
                msg: 'No se ha encontrado el lote de producto.'
            })
    } catch (error) {
        return err500(500, res, 'Algo ha salido mal', error);
    }
}


export const getProductBatchDetailsByProductBatch = async (req, res) => {
    try {
        const id = req.params.id;
        const [productBatchDetails] = await pool.query('SELECT * FROM productBatchDetails WHERE idProductBatchFK=?', [id]);
        return productBatchDetails.length > 0 ? res.status(200).json(productBatchDetails) : res.status(404).json({ msg: 'No se ha encontrado el lote de producto.' })
    } catch (e) {
        return err500(500, res, 'Algo ha salido mal', e);
    }
}

export const getProductBatchDetailsByProduct = async (req, res) => {
    try {
        const id = req.params.id;
        const [productBatchDetails] = await pool.query('SELECT * FROM productBatchDetails WHERE idProductFK=?', [id]);
        return productBatchDetails.length > 0 ? res.status(200).json(productBatchDetails) : res.status(404).json({ msg: 'No se ha encontrado el lote de producto.' })
    } catch (e) {
        return err500(500, res, 'Algo ha salido mal', e);
    }
}


export const getProductBatchDetailsByProductBatchAndProduct = async (req, res) => {
    try {
        const { idProductBatchFK, idProductFK } = req.body;
        const [productBatchDetails] = await pool.query('SELECT * FROM productBatchDetails WHERE idProductBatchFK=? AND idProductFK=?', [idProductBatchFK, idProductFK]);
        return productBatchDetails.length > 0 ? res.status(200).json(productBatchDetails) : res.status(404).json({ msg: 'No se ha encontrado el lote de producto.' })
    } catch (e) {
        return err500(500, res, 'Algo ha salido mal', e);
    }
}

