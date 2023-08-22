import pool from "../../config/database.js";

export const getInventory = async (request, response) => {
	const query = `
		SELECT 
			id,
			idProductFK,
            quantityInStock
		FROM
			inventory
		`;

	try {
		const [result] = await pool.query(query);

		response.status(200).json(result);
	} catch (e) {
		response.status(500).json(e);
	}
};
