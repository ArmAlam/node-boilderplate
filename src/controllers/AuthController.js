const httpStatus = require('http-status');
const AuthService = require('../services/AuthService');


class AuthController {
	constructor() {
		this.authService = new AuthService();
	}

	register = async (req, res) => {
		try {
			const result = await this.authService.register(req);
			res.status(res.statusCode).send(result.response);
		} catch (e) {
			console.log(e);
			res.status(httpStatus.BAD_REQUEST).send({status: false, message: 'Something went wrong'});

		}
	}

	login = async (req, res) => {
		try {
			const result = await this.authService.login(req);
			res.status(res.statusCode).send(result.response);
		} catch (e) {
			console.log(e);
			res.status(httpStatus.BAD_REQUEST).send({status: false, message: 'Something went wrong'});

		}
	}

}

module.exports = AuthController;