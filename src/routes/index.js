const express = require('express');
const userRoute = require('./userRoute');
const authRoute = require('./authRoute');

const router = express.Router();

const routes = [
	{
		path: '/user',
		route: userRoute
	},
	{
		path: '/auth',
		route: authRoute
	}
];

routes.forEach((route) => {
	router.use(route.path, route.route);
});

module.exports = router;
