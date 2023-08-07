import pool from "../../config/database.js";

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
	addBusinessCustomerDetails,
	updateBusinessCustomerDetails,
	updateBusinessCustomerDetailsByCustomerId,
};
