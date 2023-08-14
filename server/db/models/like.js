const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'likerId', as: 'liker' });
      this.belongsTo(models.User, { foreignKey: 'likedById', as: 'likedBy' });
    }
  }
  Like.init(
    {
      likerId: DataTypes.INTEGER,
      likedById: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Like',
    },
  );
  return Like;
};
