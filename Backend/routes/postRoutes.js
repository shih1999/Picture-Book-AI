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
    .route('/:post_id')
    .get(postControllers.getByPostID);
    
router
    .route('/:user_id/:p')
    .get(postControllers.getUserAllPost);

router
    .route('/publish/:post_id')
    .put(postControllers.changePublish);

router
    .route('/all')
    .get(postControllers.getAllPost);

router
    .route('/category')
    .get(postControllers.getPostByCategory);

//要加上publish 變動
// router.route("/:id").get(userControllers.getPostById);

module.exports = router;