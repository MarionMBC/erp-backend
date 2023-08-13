import pool from "../../config/database.js";

const getBinacle = async (request, response) => {
	const query = `
		SELECT 
			actionPerformedBy,
            userRole,
            actionOn,
            actionDate,
            actionType,
            description
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
	const { actionPerformedBy, userRole, actionOn, actionType, description } =
		request.body;

	const query = `
        INSERT INTO 
            binacle (actionPerformedBy, userRole, actionOn, actionType, description)
        VALUES
            (?, ?, ?, ?, ?)
    `;

	try {
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
