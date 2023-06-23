import pool from "../config/database.js";

const getCustomers = (request, response) => {

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
			customerType.idCustomerFK = customers.id
		`;

	pool.query(query, (error, result) => {
		if (error) {
			response.status(500).send(error);
		} else {
			response.status(200).send(result);
		}
	});
};

export { getCustomers };
