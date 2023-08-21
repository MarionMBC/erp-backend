import pool from "../../config/database.js";

export const addUser = async (request, response) => {
	const { uid, username, email, password, idUserRoleFK, status } =
		request.body;

	const query = `
		INSERT INTO 
			user (uid, username, email, password, idUserRoleFK, status)
		VALUES 
			(?, ?, ?, ?, ?, ?)
		`;

	try {
		const [result] = await pool.query(query, [
			uid,
			username,
			email,
			password,
			idUserRoleFK,
			status,
		]);

		response.status(200).json(result);
	} catch (e) {
		response.status(500).json(e);
	}
};

export const getUserRolByUid = async (request, response) => {
	const { uid } = request.body;

	const query = `
		SELECT 
			roles.id AS id,
			roles.name AS name
		FROM
			roles
		JOIN
			user
		ON 
			user.idUserRoleFK = roles.id
		WHERE
			user.uid = ?
		`;

	try {
		const [result] = await pool.query(query, [uid]);

		response.status(200).json(result);
	} catch (e) {
		response.status(500).json(e);
	}
};

export const getSellers = async (request, response) => {
	const query = `
		SELECT 
			user.id as id,
			user.username as username
		FROM
			user
		JOIN
			roles
		ON 
			user.idUserRoleFK = roles.id
		WHERE
			user.status = TRUE AND roles.name = 'Vendedor'
		`;

	try {
		const [result] = await pool.query(query);

		response.status(200).json(result);
	} catch (e) {
		response.status(500).json(e);
	}
};

export const getUsersCount = async (request, response) => {
	const query = `
		SELECT 
		count(user.id) AS total
		FROM
			user
		`;

	try {
		const [result] = await pool.query(query);
		const resultado = result[0].total;
		response.status(200).json(resultado);
	} catch (e) {
		response.status(500).json(e);
	}
};
