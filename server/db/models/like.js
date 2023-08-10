const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Like extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.UserInfo, {
        foreignKey: 'likerId',
        as: 'liker',
      });
      this.belongsTo(models.UserInfo, {
        foreignKey: 'likedById',
        as: 'likedBy',
      }); // Like.findAll({ .... include: ['Liked', 'Liker']})
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
