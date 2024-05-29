const express = require ('express');
const contentControllers = require('../controllers/contentControllers.js');
const router = express.Router();
// @route GET && POST - /posts/

router
    .route("/create")
    .post(contentControllers.createNewContent);

router
    .route("/publish/:post_id")
    .put(contentControllers.changePublish);

router
    .route("/modify/:page_id")
    .put(contentControllers.contentModify);

module.exports = router;