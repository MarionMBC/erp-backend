import pool from "../../config/database.js";
import { error500 } from "../../utils/statusList.js";

//productBatch

export const getProductBatches = async (req, res) => {
    try {
        const [productBatch] = await pool.query('SELECT * FROM productBatches');
        return res.status(200).json(productBatch);
    } catch (e) {
        return error500(500, res, 'Algo ha salido mal', e);
    }
}

export const getProductBatch = async (req, res) => {
    try {
        const id = req.params.id;
        const [productBatch] = await pool.query('SELECT * FROM productBatches WHERE id=?', [id]);
        return productBatch.length > 0 ? res.status(200).json(productBatch) : res.status(404).json({ msg: 'No se ha encontrado el lote de producto.' })
    } catch (e) {
        return error500(500, res, 'Algo ha salido mal', e);
    }
}


export const updateProductBatch = async (req, res) => {
    try {
        const id = req.params.id;
        const { batchCode, idProductProviderFK, batchOrderDetail, productQuantity, totalPrice, status } = req.body;
        console.log(status)
        const [productBatch] = await pool.query('UPDATE productBatches set batchCode = IFNULL(?, batchCode), idProductProviderFK = IFNULL(?, idProductProviderFK), batchOrderDetail = IFNULL(?, batchOrderDetail), productQuantity = IFNULL(?, productQuantity), totalPrice = IFNULL(?, totalPrice), status = IFNULL(?, status) where id = ?', [batchCode, idProductProviderFK, batchOrderDetail, productQuantity, totalPrice, status, id])
        const [productBatchUpdated] = await pool.query('SELECT * FROM productBatches where id=?', [id]);
        return productBatch.affectedRows > 0 && productBatchUpdated.length > 0 ?
            res.status(200).json({
                mgs: 'Se ha modificado el lote de producto correctamente.',
                updateProductBatch
            }) : res.status(404).json({
                msg: 'No se ha encontrado el lote de producto.'
            })

    } catch (error) {
        return error500(500, res, 'Algo ha salido mal', error);

    }
}


export const deleteProductBatch = async (req, res) => {
    try {
        const id = req.params.id;
        const [productBatch] = await pool.query('DELETE FROM productBatches WHERE id=?', [id]);
        return productBatch.affectedRows > 0 ?
            res.status(200).json({
                msg: 'Se ha eliminado el lote de producto correctamente.',
                productBatch
            }) : res.status(404).json({
                msg: 'No se ha encontrado el lote de producto.'
            })
    } catch (e) {
        return error500(500, res, 'Algo ha salido mal', e);
    }
}


export const createProductBatch = async (req, res) => {
    try {
        const { batchCode, idProductProviderFK, batchOrderDetail, productQuantity, totalPrice, status } = req.body;
        const [productBatch] = await pool.query('INSERT INTO productBatches (batchCode, idProductProviderFK, batchOrderDetail, productQuantity, totalPrice, status) VALUES (?,?,?,?,?,?)', [batchCode, idProductProviderFK, batchOrderDetail, productQuantity, totalPrice, status]);
        const [productBatchCreated] = await pool.query('SELECT * FROM productBatches WHERE id=?', [productBatch.insertId]);
        return productBatch.affectedRows > 0 && productBatchCreated.length > 0 ?
            res.status(200).json({
                msg: 'Se ha creado el lote de producto correctamente.',
                productBatchCreated
            }) : res.status(404).json({
                msg: 'No se ha encontrado el lote de producto.'
            })
    } catch (e) {
        return error500(500, res, 'Algo ha salido mal', e);
    }
}

export const getProductBatchByProductProvider = async (req, res) => {
    try {
        const id = req.params.id;
        const [productBatch] = await pool.query('SELECT * FROM productBatches WHERE idProductProviderFK=?', [id]);
        return productBatch.length > 0 ? res.status(200).json(productBatch) : res.status(404).json({ msg: 'No se ha encontrado el lote de producto.' })

    } catch (error) {
        return error500(500, res, 'Algo ha salido mal', error);

    }
}


export const getProductBatchByProductProviderAndStatus = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.params.status;
        const [productBatch] = await pool.query('SELECT * FROM productBatches WHERE idProductProviderFK=? AND status=?', [id, status]);
        return productBatch.length > 0 ? res.status(200).json(productBatch) : res.status(404).json({ msg: 'No se ha encontrado el lote de producto.' })

    } catch (error) {
        return error500(500, res, 'Algo ha salido mal', error);

    }
}

export const getProductBatchByStatus = async (req, res) => {
    try {
        const status = req.params.status;
        const [productBatch] = await pool.query('SELECT * FROM productBatches WHERE status=?', [status]);
        return productBatch.length > 0 ? res.status(200).json(productBatch) : res.status(404).json({ msg: 'No se ha encontrado el lote de producto.' })

    } catch (error) {
        return error500(500, res, 'Algo ha salido mal', error);

    }
}


export const getProductBatchByProductProviderAndStatusAndBatchCode = async (req, res) => {
    try {
        const id = req.params.id;
        const status = req.params.status;
        const batchCode = req.params.batchCode;
        const [productBatch] = await pool.query('SELECT * FROM productBatches WHERE idProductProviderFK=? AND status=? AND batchCode=?', [id, status, batchCode]);
        return productBatch.length > 0 ? res.status(200).json(productBatch) : res.status(404).json({ msg: 'No se ha encontrado el lote de producto.' })

    } catch (error) {
        return error500(500, res, 'Algo ha salido mal', error);

    }
}

export const getProductBatchByStatusAndBatchCode = async (req, res) => {
    try {
        const status = req.params.status;
        const batchCode = req.params.batchCode;
        const [productBatch] = await pool.query('SELECT * FROM productBatches WHERE status=? AND batchCode=?', [status, batchCode]);
        return productBatch.length > 0 ? res.status(200).json(productBatch) : res.status(404).json({ msg: 'No se ha encontrado el lote de producto.' })

    } catch (error) {
        return error500(500, res, 'Algo ha salido mal', error);

    }
}

//by batchCOde

export const getProductBatchByBatchCode = async (req, res) => {
    try {
        const batchCode = req.params.batchCode;
        const [productBatch] = await pool.query('SELECT * FROM productBatches WHERE batchCode=?', [batchCode]);
        return productBatch.length > 0 ? res.status(200).json(productBatch) : res.status(404).json({ msg: 'No se ha encontrado el lote de producto.' })

    } catch (error) {
        return error500(500, res, 'Algo ha salido mal', error);

    }
}
