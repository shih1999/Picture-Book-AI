// models/post.js
const { Sequelize, DataTypes } = require('sequelize');
const { sequelize } = require('./index');
const { v4: uuidv4 } = require('uuid');

const Detail = sequelize.define('Detail', {
  page_id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true
  },
  post_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  article: {
    type: DataTypes.STRING,
    allowNull: false
  },
  page_number: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  image_url: {
    type: DataTypes.STRING,
    allowNull: true
  },
  content: {
    type: DataTypes.STRING,
    allowNull: true
  },
  published: {
    type: DataTypes.BOOLEAN,
    defaultValue: false
  }
});

sequelize.sync();

module.exports = { Detail };
