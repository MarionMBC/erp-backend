import pool from "../../config/database.js";

export const getProductUnitMeasurements = async (req, res) => {
	try {
		const [productUnitMeasurement] = await pool.query(
			"SELECT * FROM productUnitsMeasurement"
		);
		return res.status(200).json(productUnitMeasurement);
	} catch (e) {
		return res.status(500).json({
			msg: "Algo ha salido mal",
			error: e,
		});
	}
};

export const getProductUnitMeasurement = async (req, res) => {
	try {
		const id = req.params.id;
		const [productUnitMeasurement] = await pool.query(
			"SELECT * from productUnitsMeasurement where id=?",
			[id]
		);
	} catch (e) {
		return res.status(500).json({
			msg: "Algo ha salido mal",
			error: e,
		});
	}
};

export const updateProductUnitMeasurement = async (req, res) => {
	try {
		const id = req.params.id;
		const { name, symbol } = req.body;
		const [productUnitMeasurement] = await pool.query(
			"UPDATE productUnitsMeasurement set name = IFNULL(?, name), symbol = IFNULL(?, symbol) where id = ?",
			[name, symbol, id]
		);
		const [productUnitMeasurementUpdated] = await pool.query(
			"SELECT * FROM productUnitsMeasurement where id=?",
			[id]
		);
		return productUnitMeasurement.affectedRows > 0 &&
			productUnitMeasurementUpdated.length > 0
			? res.status(200).json({
					msg: "Se ha modificado la unidad de medida correctamente.",
					...productUnitMeasurement,
			  })
			: res.status(404).json({
					msg: "No se ha encontrado la unidad de medida.",
			  });
	} catch (error) {
		return res.status(500).json({
			msg: "Algo ha salido mal",
			error: error,
		});
	}
};

export const deleteProductUnitMeasurement = async (req, res) => {
	try {
		const id = req.params.id;
		const [productUnitMeasurement] = await pool.query(
			"DELETE FROM productUnitsMeasurement WHERE id=?",
			[id]
		);
		return productUnitMeasurement.affectedRows > 0
			? res.status(200).json({
					mgs: "Se ha eliminado la unidad de medida correctamente.",
			  })
			: res.status(404).json({
					msg: "No se ha encontrado la unidad de medida.",
			  });
	} catch (e) {
		return res.status(500).json({
			msg: "Algo ha salido mal",
			error: e,
		});
	}
};

export const createProductUnitMeasurement = async (req, res) => {
	try {
		const { name, symbol } = req.body;

		const [productUnitMeasurement] = await pool.query(
			"INSERT INTO productUnitsMeasurement (name, symbol) values (?, ?)",
			[name, symbol]
		);

		return productUnitMeasurement.affectedRows > 0
			? res.status(200).json({
					msg: "Se ha creado la unidad de medida correctamente.",
					...productUnitMeasurement,
			  })
			: res.status(404).json({
					msg: "No se ha encontrado la unidad de medida.",
			  });
	} catch (e) {
		console.log(e);
		return res.status(500).json({
			msg: e.sqlState,
			error: e,
		});
	}
};
