const express = require ('express');
const commentControllers = require('../controllers/commentControllers');
const router = express.Router();
// @route GET && POST - /posts/

router
    .route("/create")
    .post(commentControllers.createNewComment);

router
    .route('/delete/:comment_id')
    .delete(commentControllers.deleteComment);

router
    .route('/modify/:comment_id')
    .put(commentControllers.modifyComment);


module.exports = router;