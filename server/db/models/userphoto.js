const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserPhoto extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'photo',
      });
    }
  }
  UserPhoto.init(
    {
      userId: DataTypes.INTEGER,
      photo: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'UserPhoto',
    },
  );
  return UserPhoto;
};
