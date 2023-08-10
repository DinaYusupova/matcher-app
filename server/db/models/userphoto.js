const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserPhoto extends Model {
    static associate(models) {
      this.belongsTo(models.UserInfo, {
        foreignKey: 'userInfoId',
        as: 'photo',
      });
    }
  }
  UserPhoto.init(
    {
      userInfoId: DataTypes.INTEGER,
      photo: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'UserPhoto',
    },
  );
  return UserPhoto;
};
