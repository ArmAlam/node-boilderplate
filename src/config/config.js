const dotenv = require('dotenv');
const path = require('path');
const Joi = require('joi');



dotenv.config({path: path.join(__dirname, '../../.env')});

const envValidation = Joi.object()
	.keys({
		NODE_ENV: Joi.string().valid('development', 'production', 'test').required(),
		PORT: Joi.number().default(8000),
		DB_HOST: Joi.string().default('localhost'),
		DB_USER: Joi.string().required(),
		DB_PASS: Joi.string().required(),
		DB_NAME: Joi.string().required(),
		DB_PORT: Joi.number().default(3306),
		JWT_SECRET: Joi.string().required().description('JWT secret key'),
		JWT_ACCESS_EXPIRATION_MINUTES: Joi.number()
			.default(30)
			.description('minutes after which access tokens expire'),
		JWT_REFRESH_EXPIRATION_DAYS: Joi.number()
			.default(30)
			.description('days after which refresh tokens expire'),
		JWT_RESET_PASSWORD_EXPIRATION_MINUTES: Joi.number()
			.default(10)
			.description('minutes after which reset password token expires'),
		JWT_VERIFY_EMAIL_EXPIRATION_MINUTES: Joi.number()
			.default(10)
			.description('minutes after which verify email token expires'),
	})
	.unknown();

const {value: envVar, error} = envValidation
	.prefs({errors: {label: 'key'}})
	.validate(process.env);

if (error) {
	throw new Error(`Config validation error: ${error.message}`);
}

module.exports = {
	nodeEnv: envVar.NODE_ENV,
	port: envVar.PORT,
	dbHost: envVar.DB_HOST,
	dbUser: envVar.DB_USER,
	dbPass: envVar.DB_PASS,
	dbName: envVar.DB_NAME,
	dbPort: envVar.DB_PORT,
	jwt: {
		secret: envVar.JWT_SECRET,
		accessExpirationMinutes: envVar.JWT_ACCESS_EXPIRATION_MINUTES,
		refreshExpirationDays: envVar.JWT_REFRESH_EXPIRATION_DAYS,
	}
};


