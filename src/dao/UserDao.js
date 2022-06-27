/* eslint-disable class-methods-use-this */
const SuperDao = require('./SuperDao');
const models = require('../db/models');

const User = models.User;

class UserDao extends SuperDao {
	constructor() {
		super(User);
	}
}

module.exports = UserDao;
