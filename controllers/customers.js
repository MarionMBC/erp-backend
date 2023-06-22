// import pool from "../../config/database.js";

const getCustomers = (request, response) => {
	response.send("Customers");
	// const data = pool.query("SELECT * FROM customers");
	// response.render("Customers", { customers: data });
};

export { getCustomers };
