import pool from "../../config/database.js";

const getCustomers = async (request, response) => {
	const query = `
		SELECT 
			*
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

const getCustomerById = async (request, response) => {
	const query = `
		SELECT 
			customers.id AS id,
			customers.firstNames AS customerFirstName,
			customers.lastNames AS customerLastName,
			customerType.name AS customerType,
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
			customers.idCustomerTypeFK = customerType.id
		JOIN 
			customerContactInfo
		ON
			customers.id = customerContactInfo.idCustomerFK
		LEFT JOIN
			naturalCustomerTypeDetails	
		ON
			customers.id = naturalCustomerTypeDetails.idCustomerFK
		LEFT JOIN
			businessCustomerTypeDetails	
		ON
			customers.id = businessCustomerTypeDetails.idCustomerFK
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
	const {
		firstNames,
		lastNames,
		country,
		city,
		direction,
		idCustomerTypeFK,
	} = request.body;

	const query = `
		INSERT INTO 
			customers (firstNames, lastNames, country, city, direction, idCustomerTypeFK)
		VALUES 
			(?, ?, ?, ?, ?, ?)
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
	const {
		firstNames,
		lastNames,
		country,
		city,
		direction,
		idCustomerTypeFK,
		id,
	} = request.body;

	const query = `
		UPDATE 
			customers
		SET 
			firstNames = ?, 
			lastNames = ?, 
			country = ?, 
			city = ?, 
			direction = ?, 
			idCustomerTypeFK = ?
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
			idCustomerTypeFK,
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
