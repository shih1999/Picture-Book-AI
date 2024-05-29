const express = require ('express');
const contentControllers = require('../controllers/contentControllers.js');
const router = express.Router();
// @route GET && POST - /posts/

router
    .route("/create")
    .post(contentControllers.createNewContent);

router
    .route("/modify/:page_id")
    .put(contentControllers.contentModify);

router
    .route("/:post_id")
    .get(contentControllers.getPostAllPage);

router
    .route("/cover/:post_id")
    .get(contentControllers.findFirstPageWithImage);

module.exports = router;