import mysql from "mysql2";
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

// Obtener una conexión del pool
pool.getConnection((err, connection) => {
	if (err) {
		console.error("Error al obtener una conexión del pool:", err);
		return;
	}

	// Realizar consultas utilizando la conexión

	// ...

	// Devolver la conexión al pool cuando haya terminado de usarla
	connection.release();
});

// Ejemplo de consulta utilizando el pool
pool.query("SELECT * FROM usuarios", (err, results) => {
	if (err) {
		console.error("Error al ejecutar la consulta:", err);
		return;
	}

	console.log("Resultados:", results);
	return;
});

export default pool