const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      this.hasMany(models.Profile, {
        foreignKey: 'userId',
        as: 'profile',
      });
      this.hasMany(models.UserPhoto, {
        foreignKey: 'userId',
        as: 'photo',
      });

      this.belongsToMany(models.User, {
        through: 'Chats',
        foreignKey: 'senderId',
        as: 'sender',
      });
      this.belongsToMany(models.User, {
        through: 'Chats',
        foreignKey: 'recipientId',
        as: 'recipient',
      });

      this.belongsToMany(models.User, {
        through: 'Likes',
        foreignKey: 'likerId',
        as: 'liker',
      });
      this.belongsToMany(models.User, {
        through: 'Likes',
        foreignKey: 'likedById',
        as: 'likedBy',
      });
      this.belongsToMany(models.User, {
        through: 'Dialogues',
        foreignKey: 'buddyOne',
        as: 'first_buddy',
      });
      this.belongsToMany(models.User, {
        through: 'Dialogues',
        foreignKey: 'buddyTwo',
        as: 'second_buddy',
      });

      this.belongsToMany(models.User, {
        through: 'Dislikes',
        foreignKey: 'dislikerId',
        as: 'dislikerId',
      });
      this.belongsToMany(models.User, {
        through: 'Dislikes',
        foreignKey: 'dislikedById',
        as: 'dislikedById',
      });
      this.hasMany(models.Filter, {
        foreignKey: 'userId',
        as: 'filter',
      });
      this.hasMany(models.DialogueUserStatus, { foreignKey: 'userId' });
    }
  }
  User.init(
    {
      email: DataTypes.TEXT,
      password: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'User',
    },
  );
  return User;
};
