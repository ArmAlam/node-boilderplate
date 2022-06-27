const config = require('./config');


module.exports = {
	development: {
		username: config.dbUser,
		password: config.dbPass,
		database: config.dbName,
		host: config.dbHost,
		port: config.dbPort,
		dialect: 'mysql',
		dialectOptions: {
			bigNumberStrings: true
		}
	},
	test: {
		username: config.dbUser,
		password: config.dbUser,
		database: config.dbName,
		host: config.dbHost,
		port: config.dbPort,
		dialect: 'mysql',
		dialectOptions: {
			bigNumberStrings: true
		}
	},
	production: {
		username: process.env.PROD_DB_USERNAME,
		password: process.env.PROD_DB_PASSWORD,
		database: process.env.PROD_DB_NAME,
		host: process.env.PROD_DB_HOSTNAME,
		port: process.env.PROD_DB_PORT,
		dialect: 'mysql',
		dialectOptions: {
			bigNumberStrings: true,
		}
	}
};