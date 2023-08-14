'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Filter extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'filter',
      });
    }
  }
  Filter.init({
    searchGender: DataTypes.STRING,
    searchCity: DataTypes.STRING,
    minSearchAge: DataTypes.INTEGER,
    maxSearchAge: DataTypes.INTEGER,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Filter',
  });
  return Filter;
};