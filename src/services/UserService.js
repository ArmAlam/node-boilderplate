const httpStatus = require('http-status');
const UserDao = require('../dao/UserDao');
const {returnError, returnSuccess} = require('../helper/responseHandler');

class UserService {
	constructor() {
		this.userDao = new UserDao();
	}

	getAllUsers = async (req) => {
		try {
			const users = await this.userDao.findAll();

			return returnSuccess(httpStatus.OK, 'Users', users);
		} catch (error) {
			console.log(error);
			returnError(httpStatus.BAD_REQUEST, 'Something went wrong');
		}
	}
}

module.exports = UserService;