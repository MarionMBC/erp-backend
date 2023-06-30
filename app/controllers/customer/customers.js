import pool from "../../config/database.js";

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
		response.status(200).json(result[0]);
	} catch (error) {
		response.status(500).json(error);
	}
};

const getCustomerById = async (request, response) => {
	const query = `
		SELECT 
			customers.id AS id,
			customers.firstNames AS customerFirstName,
			customers.lastNames AS customerLastName,
			customers.country AS customerCountry,
			customers.city AS customerCity,
			customers.createdAt AS customerAddedAt,
			customerContactInfo.email as customerEmail,
			customerContactInfo.phoneNumber as customerPhoneNumber,
			customerType.name AS customerType,
			naturalCustomerTypeDetails.rtn AS naturalCustomerRTN,
			businessCustomerTypeDetails.businessName AS businessCustomerName,
			businessCustomerTypeDetails.rtn AS businessCustomerRTN,
			businessCustomerTypeDetails.hasCredit AS businessCustomerHasCredit,
			businessCustomerTypeDetails.creditAmount AS businessCustomerCreditAmount,
			customers.createdAt AS customerRegisteredAt
		FROM 
			customers
		JOIN
			customerType
		ON
			customers.id = customerType.idCustomerFK
		JOIN 
			customerContactInfo
		ON
			customers.id = customerContactInfo.idCustomerFK
		LEFT JOIN
			naturalCustomerTypeDetails	
		ON
			customerType.id = naturalCustomerTypeDetails.idCustomerTypeFK
		LEFT JOIN
			businessCustomerTypeDetails	
		ON
			customerType.id = businessCustomerTypeDetails.idCustomerTypeFK
		wHERE
			customers.id = ?
	`;

	try {
		const result = await pool.query(query, [request.body.id]);
		response.status(200).json(result[0]);
	} catch (error) {
		response.status(500).json(error);
	}
};

export { getCustomers, getCustomerById };
