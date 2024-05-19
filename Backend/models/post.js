const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');
const { sequelize } = require('./index');

const Post = sequelize.define('Post', {
  post_id: {
    type: DataTypes.UUID,
    defaultValue: uuidv4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  likes_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  comments: {
    type: DataTypes.STRING,
    allowNull: true 
  },
  comments_count: {
    type: DataTypes.INTEGER,
    defaultValue: 0
  },
  story_category: {
    type: DataTypes.STRING,
    allowNull: true 
  }
});

module.exports = Post;
