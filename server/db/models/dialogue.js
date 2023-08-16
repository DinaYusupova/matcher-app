const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Dialogue extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, { foreignKey: 'buddyOne', as: 'first_buddy' });
      this.belongsTo(models.User, { foreignKey: 'buddyTwo', as: 'second_buddy' });
      this.hasMany(models.DialogueUserStatus, { foreignKey: 'dialogueId' });
    }
  }
  Dialogue.init(
    {
      buddyOne: DataTypes.INTEGER,
      buddyTwo: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Dialogue',
    },
  );
  return Dialogue;
};
