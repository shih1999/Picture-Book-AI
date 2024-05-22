'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  detail.init({
    page_id: DataTypes.UUID,
    post_id: DataTypes.UUID,
    article: DataTypes.STRING,
    page_number: DataTypes.INTEGER,
    image_url: DataTypes.STRING,
    content: DataTypes.STRING,
    published: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'detail',
  });
  return detail;
};