const express = require ('express');
const postControllers = require('../controllers/postControllers');
const router = express.Router();
// @route GET && POST - /posts/

router
    .route("/create")
    .post(postControllers.createNewPost);

router
    .route('/delete/:post_id')
    .delete(postControllers.deletePost);

router
    .route('/like/:post_id')
    .put(postControllers.likePost);

router
    .route('/comment/:post_id')
    .put(postControllers.commentPost);
// router.route("/:id").get(userControllers.getPostById);

module.exports = router;