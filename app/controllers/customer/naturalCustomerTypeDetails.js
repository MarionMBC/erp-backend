import pool from "../../config/database.js";

const getNaturalCustomers = async (request, response) => {
	const query = `
		SELECT 
			customers.id AS id,
			customers.firstNames AS firstNames,
			customers.lastNames AS lastNames,
			customers.country AS country,
			customers.city AS city,
			IF( ISNULL(nctd.rtn) = 1, 'N/D', nctd.rtn) AS rtn
		FROM 
			customers
		JOIN 
			naturalCustomerTypeDetails AS nctd
		ON
			nctd.idCustomerFK = customers.id
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

const addNaturalCustomerDetails = async (naturalCustomerDetailsProperties) => {
	try {
		const { idCustomerFK, naturalRtn } = naturalCustomerDetailsProperties;

		const query = `
			INSERT INTO 
				naturalCustomerTypeDetails (idCustomerFK, rtn)
			VALUES
				(? ,?)
    	`;

		const [result] = await pool.query(query, [idCustomerFK, naturalRtn]);

		return result;
	} catch (error) {
		return error;
	}
};

const updateNaturalCustomerDetails = async (request, response) => {
	const id = request.body.id;
	const idCustomerTypeFK = request.body.idCustomerTypeFK;
	const rtn = request.body.rtn === undefined ? null : request.body.rtn;

	const query = `
        UPDATE 
            naturalCustomerTypeDetails
        SET
            idCustomerTypeFK = ? , 
            rtn = ?,
            updatedAt =  CURRENT_TIMESTAMP
        WHERE
            id = ?
    `;

	try {
		const [result] = await pool.query(query, [idCustomerTypeFK, rtn, id]);
		response.status(200).json(result);
	} catch (error) {
		response.status(500).json(500);
	}
};

const updateNaturalCustomerDetailsByCustomerId = async (
	naturalCustomerDetailsProperties
) => {
	try {
		const { id, naturalRtn } = naturalCustomerDetailsProperties;

		const query = `
        UPDATE 
            naturalCustomerTypeDetails
        SET
            rtn = ?,
			updatedAt = CURRENT_TIMESTAMP
        WHERE
            idCustomerFK = ?
    `;

		const [result] = await pool.query(query, [naturalRtn, id]);

		return result;
	} catch (error) {
		return error;
	}
};

const deleteNaturalCustomerDetailsByCustomerId = async (
	naturalCustomerDetailsProperties
) => {
	try {
		const { id } = naturalCustomerDetailsProperties;

		const query = `
        DELETE FROM
			naturalCustomerTypeDetails
        WHERE
			idCustomerFK = ?
        `;

		const [result] = await pool.query(query, [id]);

		return result;
	} catch (error) {
		return error;
	}
};

export {
	getNaturalCustomers,
	addNaturalCustomerDetails,
	updateNaturalCustomerDetails,
	updateNaturalCustomerDetailsByCustomerId,
	deleteNaturalCustomerDetailsByCustomerId,
};
