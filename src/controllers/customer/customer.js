import pool from "../../config/database.js";
import {
	addCustomerContactInfo,
	updateCustomerContactInfoByCustomerId,
} from "./customerContactInfo.js";
import {
	addNaturalCustomerDetails,
	updateNaturalCustomerDetailsByCustomerId,
	deleteNaturalCustomerDetailsByCustomerId,
} from "./naturalCustomerTypeDetails.js";
import {
	addBusinessCustomerDetails,
	updateBusinessCustomerDetailsByCustomerId,
	deleteBusinessCustomerDetailsByCustomerId,
} from "./businessCustomerTypeDetails.js";

const getCustomers = async (request, response) => {
	const query = `
		SELECT 
			customers.id AS id,
			customerType.name AS customerType,
			customers.firstNames AS firstNames,
			customers.lastNames AS lastNames,
			customers.country AS country,
			customers.city AS city,
			customers.direction AS direction
		FROM 
			customers
		JOIN
			customerType
		ON
			customerType.id = customers.idCustomerTypeFK
		ORDER BY
			id ASC
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
			customers.idCustomerTypeFK AS idCustomerTypeFK,
			customers.firstNames AS firstNames,
			customers.lastNames AS lastNames,
			customers.country AS country,
			customers.city AS city,
			customers.direction AS direction,
			customerContactInfo.phoneNumber as phoneNumber,
			customerContactInfo.email as email,
			businessCustomerTypeDetails.businessName AS businessName,
			businessCustomerTypeDetails.rtn AS businessRtn,
			businessCustomerTypeDetails.hasCredit AS hasCredit,
			businessCustomerTypeDetails.creditAmount AS creditAmount,
			naturalCustomerTypeDetails.rtn AS naturalRtn
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
	try {
		const {
			idCustomerTypeFK,
			firstNames,
			lastNames,
			city,
			country,
			direction,
			phoneNumber,
			email,
			naturalRtn,
			businessName,
			businessRtn,
			hasCredit,
			creditAmount,
		} = request.body;

		const query = `
			INSERT INTO
				customers (firstNames, lastNames, country, city, direction, idCustomerTypeFK)
			VALUES
				(?, ?, ?, ?, ?, ?)
		`;

		const [result] = await pool.query(query, [
			firstNames,
			lastNames,
			country,
			city,
			direction,
			idCustomerTypeFK,
		]);

		const idCustomerFK = result.insertId;

		addCustomerContactInfo({
			idCustomerFK,
			phoneNumber,
			email,
		});

		if (businessName === null) {
			addNaturalCustomerDetails({
				idCustomerFK,
				naturalRtn,
			});
		} else {
			addBusinessCustomerDetails({
				idCustomerFK,
				businessName,
				businessRtn,
				hasCredit,
				creditAmount,
			});
		}

		response.status(200).json(result);
	} catch (e) {
		response.status(500).json(e);
	}
};

const updateCustomer = async (request, response) => {
	try {
		const {
			id,
			idCustomerTypeFK,
			firstNames,
			lastNames,
			city,
			country,
			direction,
			phoneNumber,
			email,
			naturalRtn,
			businessName,
			businessRtn,
			hasCredit,
			creditAmount,
		} = request.body;

		const userQuery = `
		SELECT 
			*
		FROM
			customers
		WHERE
			id = ?
		`;

		const [userResult] = await pool.query(userQuery, [id]);
		const idCustomerFK = id;

		if (userResult[0].idCustomerTypeFK === parseInt(idCustomerTypeFK)) {
			// Si se modifica los detalles del tipo de cliente
			if (businessName === null) {
				updateNaturalCustomerDetailsByCustomerId({
					id,
					naturalRtn,
				});
			} else {
				updateBusinessCustomerDetailsByCustomerId({
					id,
					businessName,
					businessRtn,
					hasCredit,
					creditAmount,
				});
			}
		} else {
			// Si se modifica el tipo de cliente
			if (parseInt(idCustomerTypeFK) === 1) {
				// Se cmabia el tipo de cliente de business a natural
				addNaturalCustomerDetails({
					idCustomerFK,
					naturalRtn,
				});

				// Borrando el tipo de cliente business
				deleteBusinessCustomerDetailsByCustomerId({ id });
			} else {
				// Se cmabia el tipo de cliente de business a natural
				addBusinessCustomerDetails({
					idCustomerFK,
					businessName,
					businessRtn,
					hasCredit,
					creditAmount,
				});

				// Borrando el tipo de cliente natural
				deleteNaturalCustomerDetailsByCustomerId({ id });
			}
		}

		updateCustomerContactInfoByCustomerId({ id, phoneNumber, email });

		const query = `
		UPDATE
			customers
		SET
			firstNames = ?,
			lastNames = ?,
			country = ?,
			city = ?,
			direction = ?,
			idCustomerTypeFK = ?,
			updatedAt = CURRENT_TIMESTAMP
		WHERE
			id = ?
		`;
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
