import pool from "../../config/database";
import { error500 } from "../../utils/statusList";

export const getPersonalAccessToken = async (req, res) => {
    try {
        const [personalAccessToken] = await pool.query('SELECT * FROM personalAccessToken');
        return res.status(200).json(personalAccessToken);
    } catch (e) {
        return error500(500, res, 'Algo ha salido mal', e);
    }
}

export const getPersonalAccessTokenById = async (req, res) => {
    try {
        const id = req.params.id;
        const [personalAccessToken] = await pool.query('SELECT * FROM personalAccessToken WHERE id=?', [id]);
        return personalAccessToken.length > 0 ? res.status(200).json(personalAccessToken) : res.status(404).json({ msg: 'No se ha encontrado el token.' })
    } catch (e) {
        return error500(500, res, 'Algo ha salido mal', e);
    }
}


export const getPersonalAccessTokenByUser = async (req, res) => {
    try {
        const id = req.params.id;
        const [personalAccessToken] = await pool.query('SELECT * FROM personalAccessToken WHERE idUserFK=?', [id]);
        return personalAccessToken.length > 0 ? res.status(200).json(personalAccessToken) : res.status(404).json({ msg: 'No se ha encontrado el token.' })
    } catch (error) {
        return error500(500, res, 'Algo ha salido mal', error);

    }
}


export const createPersonalAccessToken = async (req, res) => {
    try {
        const { idUserFK, name, token, abilities, lastUsed, expiresAt } = req.body;
        const newPersonalAccessToken = {
            idUserFK,
            name,
            token,
            abilities,
            lastUsed,
            expiresAt
        }

        const [personalAccessToken] = await pool.query('INSERT INTO personalAccessToken SET ?', [newPersonalAccessToken]);
        return res.status(200).json({ msg: 'Token creado correctamente', personalAccessToken: { id: personalAccessToken.insertId, ...newPersonalAccessToken } });

    } catch (error) {
        return error500(500, res, 'Algo ha salido mal', error);
    }
}

export const updatePersonalAccessToken = async (req, res) => {
    try {
        const id = req.params.id;
        const { idUserFK, name, token, abilities, lastUsed, expiresAt } = req.body;
        const newPersonalAccessToken = {
            idUserFK,
            name,
            token,
            abilities,
            lastUsed,
            expiresAt
        }
        const [personalAccessToken] = await pool.query('UPDATE personalAccessToken SET ? WHERE id=?', [newPersonalAccessToken, id]);
        return personalAccessToken.affectedRows > 0 ? res.status(200).json({ msg: 'Token actualizado correctamente', personalAccessToken: { id, ...newPersonalAccessToken } }) : res.status(404).json({ msg: 'No se ha encontrado el token.' });

    } catch (error) {
        return error500(500, res, 'Algo ha salido mal', error);

    }
}

export const deletePersonalAccessToken = async (req, res) => {
    try {
        const id = req.params.id;
        const [personalAccessToken] = await pool.query('DELETE FROM personalAccessToken WHERE id=?', [id]);
        return personalAccessToken.affectedRows > 0 ? res.status(200).json({ msg: 'Token eliminado correctamente' }) : res.status(404).json({ msg: 'No se ha encontrado el token.' });

    } catch (error) {
        return error500(500, res, 'Algo ha salido mal', error);

    }
}





