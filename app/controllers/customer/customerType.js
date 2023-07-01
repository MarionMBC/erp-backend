import pool from "../../config/database.js";

const addCustomerType = async (request, response) => {
	const { idCustomerFK, name } = request.body;
	const query = `
        INSERT INTO
            customerType (idCustomerFK, name)
        VALUES
            (?,?)
    `;

	try {
		const [result] = await pool.execute(query, [idCustomerFK, name]);
		response.status(200).json(result);
	} catch (e) {
		response.status(500).json(e);
	}
};

export { addCustomerType };
