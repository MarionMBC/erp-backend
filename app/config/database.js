import mysql from "mysql2/promise.js";
import dotenv from "dotenv";

dotenv.config();

// Configuración de la conexión a la base de datos
const dbConfig = {
	host: process.env.HOST,
	user: process.env.USER,
	password: process.env.PASSWORD,
	port: process.env.DATABASEPORT,
	database: process.env.DATABASE,
	connectionLimit: 10, // Número máximo de conexiones en el pool
};

// Crear el pool de conexiones
const pool = mysql.createPool(dbConfig);

export default pool