const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Anketa, {
        foreignKey: 'userId',
        as: 'anketa',
      });
      this.hasMany(models.UserPhoto, {
        foreignKey: 'userId',
        as: 'photo',
      });

      this.belongsToMany(models.User, {
        through: 'Likes',
        foreignKey: 'senderId',
        as: 'sender',
      });
      this.belongsToMany(models.User, {
        through: 'Likes',
        foreignKey: 'recipientId',
        as: 'recipient',
      });

      this.belongsToMany(models.User, {
        through: 'Likes',
        foreignKey: 'likerId',
        as: 'liker',
      });
      this.hasMany(models.User, {
        through: 'Likes',
        foreignKey: 'likedById',
        as: 'likedBy',
      });
    }
  }
  User.init(
    {
      email: DataTypes.TEXT,
      password: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Users',
    },
  );
  return User;
};
