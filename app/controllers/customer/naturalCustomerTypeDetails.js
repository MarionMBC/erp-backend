import pool from "../../config/database.js";

const addNaturalCustomerDetails = async (request, response) => {
	const idCustomerTypeFK = request.body.idCustomerTypeFK;
	const rtn = request.body.rtn === undefined ? null : request.body.rtn;

	const query = `
        INSERT INTO 
            naturalCustomerTypeDetails (idCustomerTypeFK, rtn)
        VALUES
            (? ,?)
    `;

	try {
		const [result] = await pool.query(query, [idCustomerTypeFK, rtn]);
		response.status(200).json(result);
	} catch (error) {
		response.status(500).json(500);
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

const updateNaturalCustomerDetailsByCustomerId = async (request, response) => {
	const idCustomerTypeFK = request.body.idCustomerTypeFK;
	const rtn = request.body.rtn === undefined ? null : request.body.rtn;

	const query = `
        UPDATE 
            naturalCustomerTypeDetails
        SET
            rtn = ?,
            updatedAt =  CURRENT_TIMESTAMP
        WHERE
            idCustomerTypeFK = ?
    `;

	try {
		const [result] = await pool.query(query, [rtn, idCustomerTypeFK]);
		response.status(200).json(result);
	} catch (error) {
		response.status(500).json(500);
	}
};

export {
	addNaturalCustomerDetails,
	updateNaturalCustomerDetails,
	updateNaturalCustomerDetailsByCustomerId,
};
