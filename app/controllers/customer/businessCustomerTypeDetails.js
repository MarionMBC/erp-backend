import pool from "../../config/database.js";

const getBusinessCustomers = async (request, response) => {
	const query = `
		SELECT 
			customers.id AS id,
			customers.firstNames AS firstNames,
			customers.lastNames AS lastNames,
			customers.country AS country,
			customers.city AS city,
			customers.direction AS direction,
			bctd.businessName AS businessName,
			IF(bctd.hasCredit = 0, 'No', 'Sí') AS hasCredit,
			bctd.creditAmount AS creditAmount
		FROM 
			customers
		JOIN 
			businessCustomerTypeDetails AS bctd
		ON
			bctd.idCustomerFK = customers.id
		`;

	try {
		const [result] = await pool.query(query);
		response.status(200).json(result);
	} catch (error) {
		response.status(500).json(error);
	}
};

const addBusinessCustomerDetails = async (
	businessCustomerDetailsProperties
) => {
	try {
		const {
			idCustomerFK,
			businessName,
			businessRtn,
			hasCredit,
			creditAmount,
		} = businessCustomerDetailsProperties;

		const query = `
			INSERT INTO 
				businessCustomerTypeDetails (idCustomerFK, businessName, rtn, hasCredit, creditAmount)
			VALUES
				(?, ?, ?, ?, ?);
        `;

		const [result] = await pool.query(query, [
			idCustomerFK,
			businessName,
			businessRtn,
			hasCredit,
			creditAmount,
		]);

		return result;
	} catch (error) {
		return error;
	}
};

const updateBusinessCustomerDetails = async (request, response) => {
	const { id, idCustomerTypeFK, businessName, rtn, hasCredit, creditAmount } =
		request.body;

	const query = `
        UPDATE 
            businessCustomerTypeDetails 
        SET 
            idCustomerTypeFK = ?, 
            businessName = ?, 
            rtn = ?, 
            hasCredit = ?, 
            creditAmount = ?,
            updatedAt = CURRENT_TIMESTAMP
        WHERE
            id = ?
        `;

	try {
		const [result] = await pool.query(query, [
			idCustomerTypeFK,
			businessName,
			rtn,
			hasCredit,
			creditAmount,
			id,
		]);

		response.status(200).json(result);
	} catch (error) {
		response.status(500).json(error);
	}
};

const updateBusinessCustomerDetailsByCustomerId = async (request, response) => {
	const { idCustomerTypeFK, businessName, rtn, hasCredit, creditAmount } =
		request.body;

	const query = `
        UPDATE 
            businessCustomerTypeDetails 
        SET 
            businessName = ?, 
            rtn = ?, 
            hasCredit = ?, 
            creditAmount = ?,
            updatedAt = CURRENT_TIMESTAMP
        WHERE
			idCustomerTypeFK = ?
        `;

	try {
		const [result] = await pool.query(query, [
			businessName,
			rtn,
			hasCredit,
			creditAmount,
			idCustomerTypeFK,
		]);

		response.status(200).json(result);
	} catch (error) {
		response.status(500).json(error);
	}
};

export {
	getBusinessCustomers,
	addBusinessCustomerDetails,
	updateBusinessCustomerDetails,
	updateBusinessCustomerDetailsByCustomerId,
};
