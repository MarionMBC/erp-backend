import pool from "../../config/database.js";

// TODOS ESTOS CAMPOS SE CALCULAN EN FRONTEND

export const getPurchaseOrders = async (req, res) => {
	try {
		const query = `
        SELECT 
			purchaseOrder.id AS id,
        	purchaseOrder.idCustomerFK AS idCustomerFK,
			CONCAT(customers.firstNames,' ',customers.lastNames) AS fullName, 
        	purchaseOrder.idSellerFK AS idSellerFK,
			user.username AS username,
        	purchaseOrder.purchaseOrderDate AS purchaseOrderDate,
        	purchaseOrder.salesTax AS salesTax,
			purchaseOrder.taxExemptPrice AS taxExemptPrice,
        	purchaseOrder.total AS total,
        	IF(purchaseOrder.status = 0, 'Pendiente', 'Realizada') AS status
        FROM 
            purchaseOrder
		JOIN
			customers
		ON
			customers.id = purchaseOrder.idCustomerFK
		JOIN
			user
		ON
			user.id = purchaseOrder.idSellerFk
        `;

		const [result] = await pool.query(query);

		return res.status(200).json(result);
	} catch (e) {
		res.status(400).json({
			msg: "Algo ha salido mal.",
			error: e,
		});
	}
};

export const getPurchaseOrderById = async (req, res) => {
	try {
		const { id } = req.body;

		const query = `
        SELECT 
			id,
			idCustomerFK,
			idSellerFK,
			purchaseOrderDate,
			salesTax,
			taxExemptPrice,
			total,
			status
        FROM 
            purchaseOrder
		WHERE	
			id = ?
        `;

		const [result] = await pool.query(query, [id]);
		return res.status(200).json(result);
	} catch (e) {
		res.status(400).json({
			msg: "Algo ha salido mal.",
			error: e,
		});
	}
};

export const addPurchaseOrder = async (req, res) => {
	try {
		const {
			idCustomerFK,
			idSellerFK,
			salesTax,
			taxExemptPrice,
			total,
			status, 
		} = req.body;

		const query = `
		
		INSERT INTO
			purchaseOrder 
				(idCustomerFK,
				idSellerFK,
				salesTax,
				taxExemptPrice,
				total,
				status)
		VALUES (?,?,?,?,?,?)
		`;

		const [result] = await pool.query(query, [
			idCustomerFK,
			idSellerFK,
			salesTax,
			taxExemptPrice,
			total,
			status, 
		]);

		return res.status(200).json(result);
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			error: "Error al insertar el producto",
			...e,
		});
	}
};
