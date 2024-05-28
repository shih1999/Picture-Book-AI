const express = require ('express');
const contentControllers = require('../controllers/contentControllers.js');
const router = express.Router();
// @route GET && POST - /posts/

router
    .route("/create")
    .post(contentControllers.createNewContent);

module.exports = router;