import pool from "../../config/database.js";

const getCustomerTypes = async (request, response) => {
	const query = `
		SELECT 
			*
		FROM
			customerType
	`;

	try {
		const [result] = await pool.execute(query);
		response.status(200).json(result);
	} catch (e) {
		response.status(500).json(e);
	}
};

const addCustomerType = async (request, response) => {
	const { idCustomerFK, name } = request.body;
	const query = `
        INSERT INTO
            customerType (idCustomerFK, name)
        VALUES
            (?,?)
    `;

	try {
		const [result] = await pool.execute(query, [idCustomerFK, name]);
		response.status(200).json(result);
	} catch (e) {
		response.status(500).json(e);
	}
};

const updateCustomerType = async (request, response) => {
	const { id, idCustomerFK, name } = request.body;
	const query = `
        UPDATE 
			customerType 
		SET 
			idCustomerFK = ?, 
			name = ?,
			updatedAt = CURRENT_TIMESTAMP
		WHERE
			id = ?`;

	try {
		const [result] = await pool.execute(query, [idCustomerFK, name, id]);
		response.status(200).json(result);
	} catch (e) {
		response.status(500).json(e);
	}
};

const updateCustomerTypeByCustomerId = async (request, response) => {
	const { idCustomerFK, name } = request.body;
	const query = `
        UPDATE 
			customerType 
		SET 
			name = ?,
			updatedAt = CURRENT_TIMESTAMP
		WHERE
			idCustomerFK = ?`;

	try {
		const [result] = await pool.execute(query, [name, idCustomerFK]);
		response.status(200).json(result);
	} catch (e) {
		response.status(500).json(e);
	}
};

export {
	getCustomerTypes,
	addCustomerType,
	updateCustomerType,
	updateCustomerTypeByCustomerId,
};
