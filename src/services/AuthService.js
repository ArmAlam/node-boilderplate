const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
const UserDao = require('../dao/UserDao');
const bcrypt = require('bcrypt');
const config = require('../config/config');
const {returnError, returnSuccess} = require('../helper/responseHandler');

class AuthService {
	constructor() {
		this.userDao = new UserDao();
	}

	register = async (req) => {
		try {
			const salt = await bcrypt.genSalt(10);
			const hasPassword = await bcrypt.hash(req.body.password.toString(), salt);
			const user = {
				email: req.body.email,
				first_name: req.body.first_name,
				last_name: req.body.last_name,
				status: 1,
				password: hasPassword,
				created_at: new Date(),
				updated_at: new Date(),
			};

			if (await this.userDao.create(user)) {

				return returnSuccess(httpStatus.CREATED, 'User Added', {});
			}

			return returnError(httpStatus.BAD_REQUEST, 'Failed to register User');
		} catch (error) {
			console.log(error);
			returnError(httpStatus.BAD_REQUEST, 'Something went wrong');
		}
	}

	login = async (req) => {
		try {
			const user = await this.userDao.findOneByWhere({email: req.body.email});

			if (user) {
				const validPassword = await bcrypt.compare(req.body.password.toString(), user.password);

				if (!validPassword) {
					return returnError(httpStatus.BAD_REQUEST, 'Invalid Login');
				}

				const token = jwt.sign({id: user.id}, config.jwt.secret);

				return returnSuccess(httpStatus.OK, 'Login', {token})

			}
		} catch (e) {
			console.log(e)
		}
	}
}

module.exports = AuthService;