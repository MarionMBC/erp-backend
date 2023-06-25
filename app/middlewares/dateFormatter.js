// -*- coding: utf-8 -*-
/*
@author: lamorales@unah.hn || alejandrom646@gmail.com ||iamchapita
@date: 2023/06/22
@version: 0.1.0
*/

import moment from "moment";
//
// const dateFormatterMiddleware = (req, res, next) => {
//
// 	try {
//
//
// 	const regexDatetimeUTC = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;
//
// 	const send = res.send;
//
// 	res.send = (body) => {
// 		const parsedBody = JSON.parse(body);
//
// 		const keys = Object.keys(parsedBody[0]);
//
// 		Object.keys(parsedBody).map((index) => {
// 			keys.map((key) => {
// 				const value = parsedBody[index][key];
//
// 				if (regexDatetimeUTC.test(value)) {
// 					const formattedDateTime = moment
// 						.utc(value)
// 						.format("YYYY-MM-DD hh:mm:ss A");
//
// 					parsedBody[index][key] = formattedDateTime;
// 				}
// 			});
// 		});
//
// 		body = JSON.stringify(parsedBody);
//
// 		res.send = send;
// 		res.send(body);
// 	};
//
// 	next(); }
// 	catch (e) {
// 		return res.status(400).json({
// 			msg: "Error con el middleware"
// 		})
// 	}
// };

const dateFormatterMiddleware = (req, res, next) => {
	try {
		const regexDatetimeUTC = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

		const send = res.send;
		res.send = (body) => {
			let parsedBody;
			try {
				parsedBody = JSON.parse(body);
			} catch (error) {
				console.error('Error al analizar el cuerpo JSON:', error);
				return send.call(res, body); // Enviar el cuerpo original sin modificaciones
			}

			if (Array.isArray(parsedBody) && parsedBody.length > 0) {
				const keys = Object.keys(parsedBody[0]);
				parsedBody.forEach((item) => {
					keys.forEach((key) => {
						const value = item[key];
						if (regexDatetimeUTC.test(value)) {
							const formattedDateTime = moment.utc(value).format("YYYY-MM-DD hh:mm:ss A");
							item[key] = formattedDateTime;
						}
					});
				});
			}

			body = JSON.stringify(parsedBody);
			res.send = send;
			res.send(body);
		};

		next();
	} catch (error) {
		return res.status(500).json({ error: 'Error en el middleware' });
	}
};

export default dateFormatterMiddleware;
