// -*- coding: utf-8 -*-
/*
@author: lamorales@unah.hn || alejandrom646@gmail.com ||iamchapita
@date: 2023/06/22
@version: 0.1.0
*/

import moment from "moment";

const dateFormatterMiddleware = (req, res, next) => {
	// const regexDatetimeUTC = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

	// const send = res.send;

	// res.send = (body) => {
	// 	Object.keys(body).map((key) => {
			


	// 		// if (regexDatetimeUTC.test(value)) {
	// 		// 	const formattedDateTime = moment
	// 		// 		.utc(value)
	// 		// 		.format("YYYY-MM-DD hh:mm:ss A");
	// 		// 		body[key] = formattedDateTime;
	// 		// }
	// 	});

	// 	// body = JSON.stringify(parsedBody);

	// 	res.send = send;
	// 	res.send(body);
	// };

	next();
};

export default dateFormatterMiddleware;
