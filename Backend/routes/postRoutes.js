const express = require ('express');
const postControllers = require('../controllers/postControllers');
const router = express.Router();
// @route GET && POST - /posts/

router
    .route("/create")
    .post(postControllers.createNewPost);



// router.route("/:id").get(userControllers.getPostById);

module.exports = router;