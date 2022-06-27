const express = require('express');
const UserController = require('../controllers/UserController');
const auth = require('../middlewares/auth');

const router = express.Router();

const userController = new UserController();
router.get('/', userController.getAllUsers);
router.post('/test', auth, (req, res) => {
	res.send('hello from protected');
});

module.exports = router;
