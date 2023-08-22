import pool from "../../config/database.js";

export const getInventory = async (request, response) => {
	const query = `
		SELECT 
			inventory.id,
			inventory.idProductFK,
            inventory.quantityInStock
		FROM
			inventory
		JOIN
			products
		ON 
			products.id = inventory.idProductFK
		WHERE 
			products.status = 1
		`;

	try {
		const [result] = await pool.query(query);

		response.status(200).json(result);
	} catch (e) {
		response.status(500).json(e);
	}
};
