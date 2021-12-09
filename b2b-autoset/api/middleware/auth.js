const jwt = require('jsonwebtoken'),
	{secret} = require('../secret')

module.exports = (req, res, next) => {
	if (req.method === "OPTIONS") {

		next();
	}

	const token = req.query.token,
		decodedData = jwt.verify(token, secret);

	req.user = decodedData;

	next();
};
