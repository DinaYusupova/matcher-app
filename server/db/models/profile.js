const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Profile extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  Profile.init(
    {
      name: DataTypes.TEXT,
      age: DataTypes.INTEGER,
      gender: DataTypes.TEXT,
      userLongitude: DataTypes.TEXT,
      userLatitude: DataTypes.TEXT,
      distanceBetweenUsers: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Profile',
    },
  );
  return Profile;
};
