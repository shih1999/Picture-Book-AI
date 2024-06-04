const express = require ('express');
const userControllers = require('../controllers/userControllers');
const router = express.Router();
// @route GET && USER - /users/

router
    .route("/register")
    .post(userControllers.createNewUser);
router
    .route("/login")
    .post(userControllers.checkUser);    

router
    .route('/:user_id')
    .get(userControllers.getUserById);
// router.route("/:id").get(userControllers.getPostById);

module.exports = router;