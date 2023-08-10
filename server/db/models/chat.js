const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.UserInfo, {
        foreignKey: 'senderId',
        as: 'sender',
      });
      this.belongsTo(models.UserInfo, {
        foreignKey: 'recipientId',
        as: 'recipient',
      });
    }
  }
  Chat.init(
    {
      senderId: DataTypes.INTEGER,
      recipientId: DataTypes.INTEGER,
      message: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: 'Chat',
    },
  );
  return Chat;
};
