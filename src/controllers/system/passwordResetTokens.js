import pool from "../../config/database";
import { error500 } from "../../utils/statusList";

export const getPasswordResetTokens = async (req, res) => {
    try {
        const [passwordResetTokens] = await pool.query('SELECT * FROM passwordResetTokens');
        return res.status(200).json(passwordResetTokens);
    } catch (e) {
        return error500(500, res, 'Algo ha salido mal', e);
    }
}

export const getPasswordResetTokenById = async (req, res) => {
    try {
        const id = req.params.id;
        const [passwordResetToken] = await pool.query('SELECT * FROM passwordResetTokens WHERE id=?', [id]);
        return passwordResetToken.length > 0 ? res.status(200).json(passwordResetToken) : res.status(404).json({ msg: 'No se ha encontrado el token de reinicio de contraseña.' })
    } catch (e) {
        return error500(500, res, 'Algo ha salido mal', e);
    }
}


export const getPasswordResetTokenByToken = async (req, res) => {
    try {
        const token = req.params.token;
        const [passwordResetToken] = await pool.query('SELECT * FROM passwordResetTokens WHERE token=?', [token]);
        return passwordResetToken.length > 0 ? res.status(200).json(passwordResetToken) : res.status(404).json({ msg: 'No se ha encontrado el token de reinicio de contraseña.' })
    } catch (error) {
        return error500(500, res, 'Algo ha salido mal', error);

    }
}

export const createPasswordResetToken = async (req, res) => {
    try {
        const { token, idUserFK } = req.body;
        const [passwordResetToken] = await pool.query('INSERT INTO passwordResetTokens (token, idUserFK) VALUES (?,?)', [token, idUserFK]);
        return res.status(200).json({ msg: 'Token de reinicio de contraseña creado correctamente.' });
    } catch (error) {
        return error500(500, res, 'Algo ha salido mal', error);
    }
}

export const updatePasswordResetToken = async (req, res) => {
    try {
        const id = req.params.id;
        const { idUserFK, email, token, status } = req.body;
        const [passwordResetToken] = await pool.query('UPDATE passwordResetTokens SET idUserFK=?, email=?, token=?, status=? WHERE id=?', [idUserFK, email, token, status, id]);
        return passwordResetToken.affectedRows > 0 ? res.status(200).json({ msg: 'Token de reinicio de contraseña actualizado correctamente.' }) : res.status(404).json({ msg: 'No se ha encontrado el token de reinicio de contraseña.' });

    } catch (error) {
        return error500(500, res, 'Algo ha salido mal', error);

    }
}

export const deletePasswordResetToken = async (req, res) => {
    try {
        const id = req.params.id;
        const [passwordResetToken] = await pool.query('DELETE FROM passwordResetTokens WHERE id=?', [id]);
        return passwordResetToken.affectedRows > 0 ? res.status(200).json({ msg: 'Token de reinicio de contraseña eliminado correctamente.' }) : res.status(404).json({ msg: 'No se ha encontrado el token de reinicio de contraseña.' });
    } catch (error) {
        return error500(500, res, 'Algo ha salido mal', error);
    }
}

export const deletePasswordResetTokenByToken = async (req, res) => {
    try {
        const token = req.params.token;
        const [passwordResetToken] = await pool.query('DELETE FROM passwordResetTokens WHERE token=?', [token]);
        return passwordResetToken.affectedRows > 0 ? res.status(200).json({ msg: 'Token de reinicio de contraseña eliminado correctamente.' }) : res.status(404).json({ msg: 'No se ha encontrado el token de reinicio de contraseña.' });
    } catch (error) {
        return error500(500, res, 'Algo ha salido mal', error);
    }
}

export const deletePasswordResetTokenByIdUser = async (req, res) => {
    try {
        const idUserFK = req.params.idUserFK;
        const [passwordResetToken] = await pool.query('DELETE FROM passwordResetTokens WHERE idUserFK=?', [idUserFK]);
        return passwordResetToken.affectedRows > 0 ? res.status(200).json({ msg: 'Token de reinicio de contraseña eliminado correctamente.' }) : res.status(404).json({ msg: 'No se ha encontrado el token de reinicio de contraseña.' });
    } catch (error) {
        return error500(500, res, 'Algo ha salido mal', error);
    }
}


export const deletePasswordResetTokenByEmail = async (req, res) => {
    try {
        const email = req.params.email;
        const [passwordResetToken] = await pool.query('DELETE FROM passwordResetTokens WHERE email=?', [email]);
        return passwordResetToken.affectedRows > 0 ? res.status(200).json({ msg: 'Token de reinicio de contraseña eliminado correctamente.' }) : res.status(404).json({ msg: 'No se ha encontrado el token de reinicio de contraseña.' });
    } catch (error) {
        return error500(500, res, 'Algo ha salido mal', error);
    }
}

