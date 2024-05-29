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
    .route('/modify/:post_id')
    .put(postControllers.modifyPost);

router
    .route('/:user_id/:p')
    .get(postControllers.getUserAllPost);

router
    .route('/')
    .get(postControllers.getAllPost);

// router.route("/:id").get(userControllers.getPostById);

module.exports = router;