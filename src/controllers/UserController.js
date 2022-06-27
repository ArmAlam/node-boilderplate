const httpStatus = require('http-status');
const UserService = require('../services/UserService');


class UserController {
	constructor() {
		this.userService = new UserService();
	}

	getAllUsers = async (req, res) => {
		try {
			const result = await this.userService.getAllUsers(req);
			res.status(httpStatus.OK).send(result.response);
		} catch (e) {
			console.log(e);
			res.status(httpStatus.BAD_REQUEST).send({message: 'somethign went wrong', status: false})
		}
	}
}

module.exports = UserController;