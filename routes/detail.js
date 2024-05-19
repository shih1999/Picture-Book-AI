// routes/detail.js
const express = require('express');
const detailController = require('../controllers/detailController');

const router = express.Router();

// 獲取所有繪本
router.get('/:post_id', detailController.getDetailsByPostId);

// 獲取特定繪本的特定頁數
router.get('/:post_id/:page_number', detailController.getDetailByPostAndPage);

// 更新發佈狀態
router.put('/:detail_id/publish', detailController.updateDetailPublishedStatus);

module.exports = router;
