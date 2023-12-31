'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserPhoto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
      });
    }
  }
  UserPhoto.init({
    userId: DataTypes.INTEGER,
    photo: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'UserPhoto',
  });
  return UserPhoto;
};