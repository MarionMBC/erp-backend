// -*- coding: utf-8 -*-
/*
@author: lamorales@unah.hn || alejandrom646@gmail.com ||iamchapita
@date: 2023/06/22
@version: 0.1.0
*/

import moment from "moment";

const dateFormatterMiddleware = (req, res, next) => {
	const regexDatetimeUTC = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/;

	const send = res.send;

	res.send = (body) => {
		const parsedBody = JSON.parse(body);

		const keys = Object.keys(parsedBody[0]);

		Object.keys(parsedBody).map((index) => {
			keys.map((key) => {
				const value = parsedBody[index][key];

				if (regexDatetimeUTC.test(value)) {
					const formattedDateTime = moment
						.utc(value)
						.format("YYYY-MM-DD hh:mm:ss A");

					parsedBody[index][key] = formattedDateTime;
				}
			});
		});

		body = JSON.stringify(parsedBody);

		res.send = send;
		res.send(body);
	};

	next();
};

export default dateFormatterMiddleware;
