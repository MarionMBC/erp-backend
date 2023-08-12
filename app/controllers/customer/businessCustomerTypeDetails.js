import pool from "../../config/database.js";

const getBusinessCustomers = async (request, response) => {
	const query = `
		SELECT 
			customers.id AS id,
			customers.firstNames AS firstNames,
			customers.lastNames AS lastNames,
			customers.country AS country,
			customers.city AS city,
			bctd.businessName AS businessName,
			IF(bctd.hasCredit = 0, 'No', 'Sí') AS hasCredit,
			FORMAT(bctd.creditAmount, 0) AS creditAmount
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

const updateBusinessCustomerDetailsByCustomerId = async (
	businessCustomerDetailsProperties
) => {

	console.log(businessCustomerDetailsProperties);

	try {
		const { id, businessName, businessRtn, hasCredit, creditAmount } =
			businessCustomerDetailsProperties;

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
			idCustomerFK = ?
        `;

		const [result] = await pool.query(query, [
			businessName,
			businessRtn,
			hasCredit,
			creditAmount,
			id,
		]);
		return result;
	} catch (error) {
		return error;
	}
};

export {
	getBusinessCustomers,
	addBusinessCustomerDetails,
	updateBusinessCustomerDetails,
	updateBusinessCustomerDetailsByCustomerId,
};
