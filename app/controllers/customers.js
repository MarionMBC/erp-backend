import pool from "../config/database.js";

const getCustomers = async (request, response) => {
	const query = `
		SELECT 
			customers.id as id,
			customers.firstNames AS customerFirstName,
			customers.lastNames AS customerLastName,
			customers.country AS customerCountry,
			customers.city AS customerCity,
			customers.createdAt AS customerAddedAt,
			customerType.name AS customerType
		FROM 
			customers
		JOIN
			customerType
		ON
			customers.id = customerType.idCustomerFK
		ORDER BY
			id 
		`;

	try {
		const result = await pool.query(query);
		response.status(200).json(result);
	} catch (error) {
		response.status(500).json(error);
	}
};

export { getCustomers };
