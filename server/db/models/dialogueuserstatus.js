const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class DialogueUserStatus extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.User, { foreignKey: 'userId' });
      this.belongsTo(models.Dialogue, { foreignKey: 'dialogueId' });
    }
  }
  DialogueUserStatus.init(
    {
      userId: DataTypes.INTEGER,
      dialogueId: DataTypes.INTEGER,
      status: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: 'DialogueUserStatus',
    },
  );
  return DialogueUserStatus;
};
