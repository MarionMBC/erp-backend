import pool from "../../config/database.js";

export const getProductProviders = async(req, res) => {
    try {
        const [productProviders] = await pool.query('SELECT * from productProviders');
        return res.status(200).json(productProviders);
    } catch (e) {
        return res.status(500).json(
            {
                msg: 'Algo ha salido mal',
                error: e
            }
        )
    }
}

export const getProductProvider  = async (req, res) => {
    try {
        const id = req.params.id;
        const [productProvider] = await pool.query('SELECT * from productProviders WHERE id=?', [id]);
        return productProvider.length > 0 ? res.status(200).json(productProvider) : res.status(404).json({msg: 'No se ha encontrado el proveedor de productos'})
    } catch (e) {
        return res.status(500).json(
            {
                msg: 'Algo ha salido mal',
                error: e
            }
        )
    }
}