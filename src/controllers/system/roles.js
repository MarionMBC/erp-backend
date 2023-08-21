import pool from "../../config/database";
import { error500 } from "../../utils/statusList";

export const getRoles = async (req, res) => {
    try {
        const [roles] = await pool.query('SELECT * FROM roles');
        return res.status(200).json(roles);
    } catch (e) {
        return error500(500, res, 'Algo ha salido mal', e);
    }
}

export const getRoleById = async (req, res) => {
    try {
        const id = req.params.id;
        const [roles] = await pool.query('SELECT * FROM roles WHERE id=?', [id]);
        return roles.length > 0 ? res.status(200).json(roles) : res.status(404).json({ msg: 'No se ha encontrado el rol.' })
    } catch (e) {
        return error500(500, res, 'Algo ha salido mal', e);
    }
}

export const getRoleByName = async (req, res) => {
    try {
        const name = req.params.name;
        const [roles] = await pool.query('SELECT * FROM roles WHERE name=?', [name]);
        return roles.length > 0 ? res.status(200).json(roles) : res.status(404).json({ msg: 'No se ha encontrado el rol.' })
    } catch (e) {
        return error500(500, res, 'Algo ha salido mal', e);
    }
}

export const createRole = async (req, res) => {
    try {
        const { name, status } = req.body;
        const [roles] = await pool.query('INSERT INTO roles (name, status) VALUES (?,?)', [name, status]);
        return res.status(200).json({ msg: 'Rol creado correctamente', id: roles.insertId });
    } catch (e) {
        return error500(500, res, 'Algo ha salido mal', e);
    }
}

export const updateRole = async (req, res) => {
    try {
        const id = req.params.id;
        const { name, status } = req.body;
        const [roles] = await pool.query('UPDATE roles SET name=?, status=? WHERE id=?', [name, status, id]);
        return res.status(200).json({ msg: 'Rol actualizado correctamente', id: roles.insertId });
    } catch (e) {
        return error500(500, res, 'Algo ha salido mal', e);
    }
}

export const deleteRole = async (req, res) => {
    try {
        const id = req.params.id;
        const [roles] = await pool.query('DELETE FROM roles WHERE id=?', [id]);
        return roles.affectedRows > 0 ? res.status(200).json({ msg: 'Rol eliminado correctamente' }) : res.status(404).json({ msg: 'No se ha encontrado el rol.' });
    } catch (e) {
        return error500(500, res, 'Algo ha salido mal', e);
    }
}


export const getRoleStatus = async (req, res) => {
    try {
        const [roles] = await pool.query('SELECT * FROM roles WHERE status = 1');
        return roles.length > 0 ? res.status(200).json(roles) : res.status(404).json({ msg: 'No se ha encontrado el rol.' })
    } catch (e) {
        return error500(500, res, 'Algo ha salido mal', e);
    }
}

export const getRoleStatusById = async (req, res) => {
    try {
        const id = req.params.id;
        const [roles] = await pool.query('SELECT * FROM roles WHERE status = 1 AND id=?', [id]);
        return roles.length > 0 ? res.status(200).json(roles) : res.status(404).json({ msg: 'No se ha encontrado el rol.' })
    } catch (e) {
        return error500(500, res, 'Algo ha salido mal', e);
    }
}


