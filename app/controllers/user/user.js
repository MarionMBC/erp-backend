import pool from "../../config/database.js";

const addUser = async (request, response) => {
	const { uid, username, email, password, idUserRoleFK } = request.body;

	const query = `
		INSERT INTO 
			user (uid, username, email, password, idUserRoleFK)
		VALUES 
			(?, ?, ?, ?, ?)
		`;

	try {
		const [result] = await pool.query(query, [
			uid,
			username,
			email,
			password,
			idUserRoleFK,
		]);

		response.status(200).json(result);
	} catch (e) {
		response.status(500).json(e);
	}
};

export { addUser };
