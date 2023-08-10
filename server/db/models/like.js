const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      //
    }
  }
  Like.init(
    {
      likerId: DataTypes.INTEGER,
      likedById: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Like',
    },
  );
  return Like;
};
