// controllers/index.js
const userController = require('./userController');
const postController = require('./postController');
const detailController = require('./detailController');
const postDetailController = require('./postDetailController');

module.exports = {
  userController,
  postController,
  detailController,
  postDetailController
};
