import pool from "../../config/database.js";

export const getProductUnitMeasurements = async (req, res) => {
    try {
        const [productUnitMeasurement] =  await pool.query('SELECT * FROM productUnitsMeasurement')
        return res.status(200).json(productUnitMeasurement);
    } catch (e) {
        return res.status(500).json({
            msg: 'Algo ha salido mal',
            error: e
        })
    }
}

export const getProductUnitMeasurement = async (req, res) => {
    try {
        const id = req.params.id;
        const [productUnitMeasurement] = await pool.query('SELECT * from productUnitsMeasurement where id=?', [id]);
    } catch (e) {
        return res.status(500).json({
            msg: 'Algo ha salido mal',
            error: e
        });
    }
}

