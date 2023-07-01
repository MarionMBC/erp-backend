import pool from "../../config/database.js";

const addBusinessCustomerDetails = async (request, response) => {
	const { idCustomerTypeFK, businessName, rtn, hasCredit, creditAmount } =
		request.body;

	const query = `
        INSERT INTO 
            businessCustomerTypeDetails (idCustomerTypeFK, businessName, rtn, hasCredit, creditAmount)
        VALUES
            (?, ?, ?, ?, ?);
        `;

	try {
		const [result] = await pool.query(query, [
			idCustomerTypeFK,
			businessName,
			rtn,
			hasCredit,
			creditAmount,
		]);

		response.status(200).json(result);
	} catch (error) {
		response.status(500).json(error);
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
            id
		]);

		response.status(200).json(result);
	} catch (error) {
		response.status(500).json(error);
	}
};

export { addBusinessCustomerDetails, updateBusinessCustomerDetails };
