'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      // define association here
    }
  }
  Like.init({
    likerId: DataTypes.INTEGER,
    likedById: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Like',
  });
  return Like;
};