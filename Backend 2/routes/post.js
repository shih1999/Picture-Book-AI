const express = require('express');
const postController = require('../controllers/postController');

const router = express.Router();

// 貼文按讚計數
router.put('/:postId/like', postController.likePost);

// 貼文留言計數
router.put('/:postId/comment', postController.addComment);

// 以post種類搜尋
router.get('/:story_category', postController.getPostsByCategory);

// 特定post
router.get('/:postId', postController.getPostsByUserId);


module.exports = router;