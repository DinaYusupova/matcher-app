'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      // define association here
    }
  }
  Chat.init({
    senderId: DataTypes.INTEGER,
    recipientId: DataTypes.INTEGER,
    message: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Chat',
  });
  return Chat;
};