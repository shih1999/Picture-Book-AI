// models/index.js
const { Sequelize } = require('sequelize');


const sequelize = new Sequelize({
  host: 'localhost',
  dialect: 'mariadb'
});

const User = require('./user');
const Detail = require('./detail');
const Post = require('./post');

// User.hasMany(Post, { foreignKey: 'user_id' });
// Post.belongsTo(User, { foreignKey: 'user_id' });

// Post.hasMany(Detail, { foreignKey: 'post_id' }); 
// Detail.belongsTo(Post, { foreignKey: 'post_id' });

sequelize.sync();

module.exports = { sequelize, User, Detail, Post };
