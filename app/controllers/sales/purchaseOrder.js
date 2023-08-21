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
        	purchaseOrder.taxablePrice AS taxablePrice,
        	purchaseOrder.taxExemptPrice AS taxExemptPrice,
        	purchaseOrder.salesTax AS salesTax,
        	purchaseOrder.subTotal AS subTotal,
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
			taxablePrice,
			taxExemptPrice,
			salesTax,
			subTotal,
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
			taxablePrice,
			taxExemptPrice,
			salesTax,
			subTotal,
			total,
			status,
		} = req.body;

		const query = `
		
		INSERT INTO
			purchaseOrder 
				(idCustomerFK,
				idSellerFK,
				taxablePrice,
				taxExemptPrice,
				salesTax,
				subTotal,
				total,
				status)
		VALUES (?,?,?,?,?,?,?,?)
		`;

		const [result] = await pool.query(query, [
			idCustomerFK,
			idSellerFK,
			taxablePrice,
			taxExemptPrice,
			salesTax,
			subTotal,
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
