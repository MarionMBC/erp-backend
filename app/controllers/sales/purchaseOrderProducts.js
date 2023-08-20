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

const addImages = async (idImage, idProduct) => {
	try {
		await pool.query(
			"INSERT INTO product_image (productId, imageId) VALUES (?, ?)",
			[idProduct, idImage]
		);
	} catch (error) {
		console.log(error);
	}
};

const updateProduct = async (req, res) => {
	try {
		const id = parseInt(req.params.id);
		const {
			name,
			description,
			idProductCategoryFK,
			idProductUnityFK,
			taxExemptPrice,
			taxablePrice,
			salePrice,
			status,
			elaborationDate,
			expirationDate,
		} = req.body;
		const [product] = await pool.query(
			"UPDATE products SET name = IFNULL(?, name), description = IFNULL(?, description), idProductCategoryFK = IFNULL(?, idProductCategoryFK), idProductUnityFK = IFNULL(?, idProductUnityFK), taxablePrice = IFNULL(?, taxablePrice), taxExemptPrice = IFNULL(?, taxExemptPrice), salePrice = IFNULL(?, salePrice), status = IFNULL(?, status), elaborationDate = IFNULL(?, elaborationDate), expirationDate = IFNULL(?, expirationDate) WHERE id = ?",
			[
				name,
				description,
				idProductCategoryFK,
				idProductUnityFK,
				taxablePrice,
				taxExemptPrice,
				salePrice,
				status,
				elaborationDate,
				expirationDate,
				id,
			]
		);

		/*       const [imagesIds] = await pool.query("SELECT productId FROM product_image WHERE productId = ?", [id]);

        images.forEach(async(image, index) => {
            const [imageUploaded] = await pool.query(
                "Update productImage set imageUrl =  IFNULL (?, imageUrl) where id = ?", [image, imagesIds[index]]);
            await pool.query(
                "update product_image  = IFNULL (?, ?)", [productAdded.insertId, imageUploaded.insertId]
            );
        });*/

		const [updatedProduct] = await pool.query(
			"SELECT * FROM products WHERE ID=?",
			[id]
		);
		return product.affectedRows > 0 && updatedProduct.length > 0
			? res.status(200).json({
					msg: "Se ha modificado el producto correctamente.",
					...product,
			  })
			: res.status(404).json({
					msg: "No se ha encontrado el producto",
			  });
	} catch (e) {
		console.log(e);
		res.status(500).json({
			error: "No se ha podido modificar el producto.",
		});
	}
};

const deleteProduct = async (req, res) => {
	try {
		const id = req.params.id;
		const [product] = await pool.query("DELETE FROM products WHERE id=?", [
			id,
		]);
		product.affectedRows === 0
			? res.status(404).json({
					msg: "No se ha encontrado el producto",
			  })
			: res.status(204).json({
					msg: "El producto se eliminó correctamente",
					...product,
			  });
	} catch (e) {
		console.log({ error: e });
		return res.status(500).json({
			msg: "No se ha podido eliminar el producto",
			error: e,
		});
	}
};

const getProductByCategoryId = async (req, res) => {
	try {
		const id = req.params.id;
		const [product] = await pool.query(
			"SELECT * FROM products WHERE idProductCategoryFK = ?",
			[id]
		);
		return product.length > 0
			? res.status(200).json(product)
			: res
					.status(404)
					.json({ msg: "No se han encontrado los productos." });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ msg: "Algo ha salido mal al obtener los productos" });
	}
};

const getProductByName = async (req, res) => {
	try {
		const name = req.params.name;
		const [product] = await pool.query(
			"SELECT * FROM products WHERE name like ?",
			[name]
		);
		return product.length > 0
			? res.status(200).json(product)
			: res
					.status(404)
					.json({ msg: "No se han encontrado los productos." });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ msg: "Algo ha salido mal al obtener los productos" });
	}
};

const getProductByCategoryName = async (req, res) => {
	try {
		const name = req.params.name;
		const [product] = await pool.query(
			"SELECT * FROM products WHERE idProductCategoryFK = (SELECT id FROM productCategory WHERE name like ?)",
			[name]
		);
		return product.length > 0
			? res.status(200).json(product)
			: res
					.status(404)
					.json({ msg: "No se han encontrado los productos." });
	} catch (error) {
		console.log(error);
		return res
			.status(500)
			.json({ msg: "Algo ha salido mal al obtener los productos" });
	}
};
