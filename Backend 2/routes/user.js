// routes/user.js
const express = require('express');
const userController = require('../controllers/userController');

const router = express.Router();

// 用戶註冊
router.post('/register', userController.register);

// 用戶登入
router.post('/login', userController.login);

// 用户登出
router.post('/logout', userController.authenticateToken, userController.logout);

module.exports = router;
