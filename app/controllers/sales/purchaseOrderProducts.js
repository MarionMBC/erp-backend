import pool from "../../config/database.js";

export const getPurchaseOrderProducts = async (req, res) => {
	try {
		const query = `
		SELECT
			purchaseOrderProducts.id AS id,
			purchaseOrderProducts.idProductFk AS idProductFk,
			products.name AS product,
			purchaseOrderProducts.pricePerUnit AS pricePerUnit ,
			purchaseOrderProducts.productQuantity AS productQuantity ,
			purchaseOrderProducts.totalPerProduct AS totalPerProduct
		FROM
			purchaseOrderProducts
		JOIN
			products
		ON
			products.id = purchaseOrderProducts.idProductFK
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

export const addProductToPurchaseOrder = async (req, res) => {
	// Primero se debe insertar un registro en purchaseOrder para poder insertar
	// los productos en el purchaseOrderProduct

	try {
		const products = req.body;

		const query = `
		INSERT INTO 
			purchaseOrderProducts 
			(idPurchaseOrderFK, idProductFK, pricePerUnit, productQuantity, totalPerProduct)
		VALUES (?)
		`;

		const values = products.map((product) => [
			product.idPurchaseOrderFK,
			product.idProductFK,
			product.pricePerUnit,
			product.productQuantity,
			product.totalPerProduct,
		]);

		let result;
		values.map((product) => {
			result = pool.query(query, [product]);
		});

		return res.status(200).json({ msg: "Producto agregado correctamente" });
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			error: "Error al insertar el producto",
			...e,
		});
	}
};
