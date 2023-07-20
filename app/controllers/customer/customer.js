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
		const [result] = await pool.query(query);
		response.status(200).json(result);
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
		const [result] = await pool.query(query, [request.body.id]);
		response.status(200).json(result);
	} catch (error) {
		response.status(500).json(error);
	}
};

const addCustomer = async (request, response) => {
	const { firstNames, lastNames, country, city, direction } = request.body;

	const query = `
		INSERT INTO 
			customers (firstNames, lastNames, country, city, direction)
		VALUES 
			(?, ?, ?, ?, ?)
		`;

	try {
		const [result] = await pool.query(query, [
			firstNames,
			lastNames,
			country,
			city,
			direction,
		]);

		response.status(200).json(result);
	} catch (e) {
		response.status(500).json(e);
	}
};

const updateCustomer = async (request, response) => {
	const { firstNames, lastNames, country, city, direction, id } =
		request.body;

	const query = `
		UPDATE 
			customers
		SET 
			firstNames = ?, 
			lastNames = ?, 
			country = ?, 
			city = ?, 
			direction = ?, 
			updatedAt = CURRENT_TIMESTAMP
		WHERE 
			id = ?
		`;
	try {
		const [result] = await pool.query(query, [
			firstNames,
			lastNames,
			country,
			city,
			direction,
			id,
		]);
		response.status(200).json(result);
	} catch (e) {
		response.status(500).json(e);
	}
};

const getCustomerStatistics = async (request, response) => {
	const query = `
		SELECT 
			COUNT(*) AS 'registeredCustomrs',
			(
				SELECT 
					COUNT(*)
				FROM
					customerType
				WHERE
					name = 'Empresarial'
			) AS 'enterpriseCustomers',
			(
				SELECT 
					COUNT(*)
				FROM
					customerType
				WHERE
					name = 'Natural'
			) AS 'naturalCustomers',
			(
				SELECT 
					COUNT(*)
				FROM
					customerType
				WHERE
					MONTH(createdAt) = MONTH(CURRENT_TIMESTAMP())
			) AS 'customerRegisteredInCurrentMonth'
		FROM
			customers
		`;

	try {
		const [result] = await pool.query(query);
		response.status(200).json(result);
	} catch (error) {
		response.status(500).json(error);
	}
};

export {
	getCustomers,
	getCustomerById,
	addCustomer,
	updateCustomer,
	getCustomerStatistics,
};
