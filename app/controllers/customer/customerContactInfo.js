import pool from "../../config/database.js";

const addCustomerContactInfo = async (contactInfoProperties) => {
	try {
		const { idCustomerFK, phoneNumber, email } = contactInfoProperties;

		const query = `
			INSERT INTO 
				customerContactInfo (idCustomerFK, phoneNumber, email)
			VALUES 
				(?,?,?)
    	`;
		const [result] = await pool.query(query, [
			idCustomerFK,
			phoneNumber,
			email,
		]);
		return result;
	} catch (err) {
		return err;
	}
};

const updateCustomerContactInfo = async (request, response) => {
	const { id, idCustomerFK, phoneNumber, email } = request.body;

	const query = `
        UPDATE
            customerContactInfo 
        SET
            idCustomerFK = ?, 
            phoneNumber = ?, 
            email = ?
        WHERE
            id = ?
    `;

	try {
		const [result] = await pool.query(query, [
			idCustomerFK,
			phoneNumber,
			email,
			id,
		]);
		response.status(200).json(result);
	} catch (err) {
		response.status(500).json(err);
	}
};

const updateCustomerContactInfoByCustomerId = async (request, response) => {
	const { idCustomerFK, phoneNumber, email } = request.body;

	const query = `
        UPDATE
            customerContactInfo 
        SET
            phoneNumber = ?, 
            email = ?
        WHERE
            idCustomerFK = ?
    `;

	try {
		const [result] = await pool.query(query, [
			phoneNumber,
			email,
			idCustomerFK,
		]);
		response.status(200).json(result);
	} catch (err) {
		response.status(500).json(err);
	}
};

export {
	addCustomerContactInfo,
	updateCustomerContactInfo,
	updateCustomerContactInfoByCustomerId,
};
