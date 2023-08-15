import pool from "../../config/database.js";

const getBinacle = async (request, response) => {
	const query = `
		SELECT 
			id,
			actionPerformedBy,
            userRole,
            actionOn,
            actionDate,
            actionType
		FROM 
			binacle
		`;

	try {
		const [result] = await pool.query(query);
		response.status(200).json(result);
	} catch (error) {
		response.status(500).json(error);
	}
};

const addAction = async (request, response) => {
	try {
		const { uid, actionOn, actionType, description } = request.body;

		const userDetailsQuery = `
			SELECT 
				user.username AS actionPerformedBy, 
				roles.name AS userRole
			FROM 
				user 
			JOIN
				roles
			ON 
				roles.id = user.idUserRoleFK
			WHERE 
				uid = ?
		`;

		// g1zTiXgUQfO0q47aXsmzsiQUWPn1
		const [userDetailsResult] = await pool.query(userDetailsQuery, [uid]);
		const actionPerformedBy = userDetailsResult[0].actionPerformedBy;
		const userRole = userDetailsResult[0].userRole;

		const query = `
			INSERT INTO 
				binacle (actionPerformedBy, userRole, actionOn, actionType, description)
			VALUES
				(?, ?, ?, ?, ?)
    	`;

		const [result] = await pool.query(query, [
			actionPerformedBy,
			userRole,
			actionOn,
			actionType,
			description,
		]);

		response.status(200).json(result);
	} catch (error) {
		response.status(500).json(error);
	}
};

const updateActionById = async (request, response) => {
	const {
		actionPerformedBy,
		userRole,
		actionOn,
		actionType,
		description,
		id,
	} = request.body;

	const query = `
        UPDATE
			binacle
		SET
            actionPerformedBy = ?, userRole = ?, actionOn = ?, actionType = ?, description = ?
		WHERE
			id = ?
    `;

	try {
		const [result] = await pool.query(query, [
			actionPerformedBy,
			userRole,
			actionOn,
			actionType,
			description,
			id,
		]);
		response.status(200).json(result);
	} catch (error) {
		response.status(500).json(error);
	}
};

export { getBinacle, addAction, updateActionById };
