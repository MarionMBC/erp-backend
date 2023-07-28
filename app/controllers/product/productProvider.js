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

export const updateProductProvider = async (req, res) => {
    try {
        const id = req.params.id;
        const {name, email, phoneNumber, status} = req.body;
        const [productProvider] = await pool.query('UPDATE productProviders set name = IFNULL(?, name), email = IFNULL(?, email), phoneNumber = IFNULL(?, phoneNumber), status = IFNULL(?, status) where id = ?', [name, email, phoneNumber, status, id])
        const [productProviderUpdated] = await pool.query('SELECT * FROM productProviders where id=?', [id]);
        return productProvider.affectedRows > 0 && productProviderUpdated.length > 0 ?
            res.status(200).json({
                mgs: 'Se ha modificado el proveedor de productos correctamente.',
                productProviderUpdated
            }) : res.status(404).json({
                msg: 'No se ha encontrado el proveedor de productos.'
            })
    
    } catch (error) {
        return res.status(500).json(
            {
                msg: 'Algo ha salido mal',
                error: error
            }
        )
    }
}


export const deleteProductProvider = async (req, res) => {
    try {
        const id = req.params.id;
        const [productProvider] = await pool.query('DELETE FROM productProviders WHERE id=?', [id]);
        return productProvider.affectedRows > 0 ?
            res.status(200).json({
                msg: 'Se ha eliminado el proveedor de productos correctamente.',
                productProvider
            }) : res.status(404).json({
                msg: 'No se ha encontrado el proveedor de productos.'
            })
    } catch (error) {
        return res.status(500).json(
            {
                msg: 'Algo ha salido mal',
                error: error
            }
        )
    }
}


export const createProductProvider = async (req, res) => {
    try {
        const {name, email, phoneNumber, status} = req.body;
        const [productProvider] = await pool.query('INSERT INTO productProviders (name, email, phoneNumber, status) VALUES (?, ?, ?, ?)', [name, email, phoneNumber, status]);
        const [productProviderCreated] = await pool.query('SELECT * FROM productProviders WHERE id=?', [productProvider.insertId]);
        return productProvider.affectedRows > 0 && productProviderCreated.length > 0 ?
            res.status(200).json({
                msg: 'Se ha creado el proveedor de productos correctamente.',
                productProviderCreated
            }) : res.status(404).json({
                msg: 'No se ha encontrado el proveedor de productos.'
            })
    } catch (error) {
        return res.status(500).json(
            {
                msg: 'Algo ha salido mal',
                error: error
            }
        )
    }
}



