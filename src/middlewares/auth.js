const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');
const config = require('../config/config');


const auth = (req, res, next) => {
	let token = req.header('Authorization');
	if (!token) return res.status(401).send("Access Denied");

	try {
		if (token.startsWith('Bearer ')) {
			// Remove Bearer from string
			token = token.slice(7, token.length).trim();
			console.log(token)
		}
		const verified = jwt.verify(token, config.jwt.secret);

		if( verified) {
			return next();
		}
		res.status(httpStatus.BAD_REQUEST).send({status: false, message: 'Unauthorized'});
	}
	catch (err) {
		res.status(400).send("Invalid Token");
	}
};

module.exports = auth;
