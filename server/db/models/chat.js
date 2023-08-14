const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Chat extends Model {
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender' });
      this.belongsTo(models.User, { foreignKey: 'recipientId', as: 'recipient' });
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
