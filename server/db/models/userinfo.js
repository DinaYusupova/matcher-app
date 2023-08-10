const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserInfo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.UserAuth, {
        foreignKey: 'userAuthId',
        as: 'userAuthData',
      });
      this.hasMany(models.UserPhoto, {
        foreignKey: 'userInfoId',
        as: 'photo',
      });
      this.hasMany(models.Like, {
        foreignKey: 'likerId',
        as: 'liker',
      });
      this.hasMany(models.Like, {
        foreignKey: 'likedById',
        as: 'liked',
      });
      this.hasMany(models.Chat, {
        foreignKey: 'senderId',
        as: 'sender',
      });
      this.hasMany(models.Like, {
        foreignKey: 'recipientId',
        as: 'recipient',
      });
    }
  }
  UserInfo.init(
    {
      name: DataTypes.TEXT,
      age: DataTypes.INTEGER,
      gender: DataTypes.TEXT,
      city: DataTypes.TEXT,
      userAuthId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
      userPhotoId:
    },
    {
      sequelize,
      modelName: 'UserInfo',
    },
  );
  return UserInfo;
};
