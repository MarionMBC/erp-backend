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


export const getAllUsers = async (request, response) => {
/* 	const { page, rowsPerPage } = request.body; */
	const query = `
		SELECT 
			user.uid as uid,
			user.id as id,
			user.username as username,
			user.email as email,
			roles.name as userRole,
			user.status as userStatus
		FROM
			user
		INNER JOIN
			roles
		ON 
			user.idUserRoleFK = roles.id
		ORDER BY
			user.id ASC
		`;

	try {
		const [result] = await pool.query(query);

		response.status(200).json(result);
	} catch (e) {
		response.status(500).json(e);
	}
}

export const updateRole = async (request, response) => {
	const { uid, idUserRoleFK } = request.body;

	const query = `
		UPDATE
			user
		SET
			idUserRoleFK = IFNULL(?, idUserRoleFK)
		WHERE
			uid = ?
		`;

	try {
		
		const [result] = await pool.query(query, [idUserRoleFK, uid]);

		response.status(200).json(result);
	} catch (e) {
		response.status(500).json(e);
	}
};



export const getAllRoles = async (request, response) => {
	const query = `
		SELECT 
			roles.id as id,
			roles.name as name,
			roles.status as status
		FROM
			roles
		`;

	try {
		const [result] = await pool.query(query);

		response.status(200).json(result);
	} catch (e) {
		response.status(500).json(e);
	}
}

export const updateStatus = async (request, response) => {
	const { uid, status } = request.body;
	const query = `
		UPDATE
			user
		SET
			status = IFNULL(?, status)	
		WHERE
			uid = ?
		`;
	try {
		const [result] = await pool.query(
			query,
			[status, uid]
		);
		response.status(200).json(result);
	} catch (e) {
		response.status(500).json(e);
	}
};	


export const updateRoleAndStatus = async (request, response) => {
	const { uid, idUserRoleFK, status } = request.body;
	const query = `
		UPDATE
			user
		SET
			idUserRoleFK = IFNULL(?, idUserRoleFK),
			status = IFNULL(?, status)
		WHERE
			uid = ?
		`;
	try {
		const [result] = await pool.query(
			query,
			[idUserRoleFK, status, uid]
		);
		response.status(200).json(result);
	}
	catch (e) {
		response.status(500).json(e);
	}
};

