const express = require ('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();
// @route GET && USER - /users/

router
    .route("/register")
    .post(userControllers.createNewUser);
router
    .route("/signin")
    .post(userControllers.checkUser);

// router.route("/:id").get(userControllers.getPostById);

module.exports = router;