'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Shares extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Shares.hasMany(models.UserShares)
    }
  }
  Shares.init({
    totalShares: DataTypes.INTEGER,
    remainingShares: DataTypes.INTEGER,
    price: DataTypes.INTEGER,
    companyName: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Shares',
  });
  return Shares;
};