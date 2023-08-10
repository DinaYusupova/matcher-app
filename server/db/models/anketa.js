const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Anketa extends Model {
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      });
    }
  }
  Anketa.init(
    {
      name: DataTypes.TEXT,
      age: DataTypes.INTEGER,
      gender: DataTypes.TEXT,
      city: DataTypes.TEXT,
      userId: DataTypes.INTEGER,
      description: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'UserInfo',
    },
  );
  return Anketa;
};
