const jwt = require('jsonwebtoken');
const httpStatus = require('http-status');


const auth = (req, res, next) => {
	let token = req.header('Authorization');
	if (!token) return res.status(401).send("Access Denied");

	try {
		if (token.startsWith('Bearer ')) {
			// Remove Bearer from string
			token = token.slice(7, token.length).trim();
			console.log(token)
		}
		const verified = jwt.verify(token, '12345');


		console.log('-------------------------')
		console.log(verified)
		console.log('-------------------------')



		if( verified) {
			return next();
		}
		res.status(httpStatus.BAD_REQUEST).send({status: false, message: 'Unauthorized'});
	}
	catch (err) {
		console.log('err----------------------------------')
		console.log(err.message)
		console.log('err----------------------------------')
		res.status(400).send("Invalid Token");
	}
};

module.exports = auth;
