const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class UserAuth extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.UserInfo, {
        foreignKey: 'userId',
        as: 'info',
      });
    }
  }
  UserAuth.init(
    {
      email: DataTypes.TEXT,
      password: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'UserAuth',
    },
  );
  return UserAuth;
};
