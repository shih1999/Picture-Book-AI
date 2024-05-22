const express = require('express');
const postDetailController = require('../controllers/postDetailController');

const router = express.Router();

// 創建post的狀態以及post的內容細節
router.post('/createPostAndDetail', postDetailController.createPostAndDetail);

module.exports = router;
