import mysql from "mysql2/promise.js";
import dotenv from "dotenv";
import moment from "moment";

dotenv.config();

// Configuración de la conexión a la base de datos
const dbConfig = {
	host: process.env.HOST,
	user: 'admin', // NO CAMBIAR
	password: process.env.PASSWORD,
	port: process.env.DATABASEPORT,
	database: process.env.DATABASE,
	connectionLimit: 10,
	typeCast: function (field, next) {
		if (field.type === "DATETIME") {
			return moment(field.string()).format("YYYY-MM-DD hh:mm:ss A");
		}
		return next();
	},
};

// Crear el pool de conexiones
const pool = mysql.createPool(dbConfig);

export default pool;
