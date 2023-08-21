import pool from "../../config/database";
import { error500 } from "../../utils/statusList";

export const getInventory = async (req, res) => {
    try {
        const [inventory] = await pool.query('SELECT * FROM inventory');
        return res.status(200).json(inventory);
    } catch (e) {
        return error500(500, res, 'Algo ha salido mal', e);
    }
}

export const getInventoryById = async (req, res) => {
    try {
        const id = req.params.id;
        const [inventory] = await pool.query('SELECT * FROM inventory WHERE id=?', [id]);
        return inventory.length > 0 ? res.status(200).json(inventory) : res.status(404).json({ msg: 'No se ha encontrado el inventario.' })
    } catch (e) {
        return error500(500, res, 'Algo ha salido mal', e);
    }
}


export const getInventoryByProductProvider = async (req, res) => {
    try {
        const id = req.params.id;
        const [inventory] = await pool.query('SELECT * FROM inventory WHERE idProductProviderFK=?', [id]);
        return inventory.length > 0 ? res.status(200).json(inventory) : res.status(404).json({ msg: 'No se ha encontrado el inventario.' })
    } catch (error) {
        return error500(500, res, 'Algo ha salido mal', error);

    }
}
