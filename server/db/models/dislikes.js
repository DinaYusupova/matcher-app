const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Dislikes extends Model {
    static associate(models) {
      // define association here
    }
  }
  Dislikes.init(
    {
      dislikerId: DataTypes.INTEGER,
      dislikedById: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Dislikes',
    },
  );
  return Dislikes;
};
