import pool from "../../config/database.js";

export const setDates = async (request, response) => {
	try {
		const { licenseStartDate, licenseDueDate } = request.body;

		const deleteQuery = `
			DELETE FROM systemInfo;
		`;

		const [deleteQueryResult] = await pool.query(deleteQuery);

		const query = `
			INSERT INTO
				systemInfo (licenseStartDate, licenseDueDate)
			VALUES
				(?, ?)
		`;

		const [result] = await pool.query(query, [
			licenseStartDate,
			licenseDueDate,
		]);

		response.status(200).json(result);
	} catch (e) {
		response.status(500).json(e);
	}
};

export const getLicenseStatus = async (request, response) => {
	try {
		const query = `
		SELECT
            licenseStartDate,
            licenseDueDate,
            DATEDIFF(licenseDueDate, CURDATE()) AS remainingDays,
            IF(DATEDIFF(licenseDueDate, CURDATE()) > 0, TRUE, FALSE ) AS licenseStatus
        FROM
            systemInfo
		`;

		const [result] = await pool.query(query);

		response.status(200).json(result);
	} catch (e) {
		response.status(500).json(e);
	}
};
