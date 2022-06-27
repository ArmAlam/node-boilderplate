const express = require('express');
const AuthController = require('../controllers/AuthController');

const router = express.Router();

const authController = new AuthController();
router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
