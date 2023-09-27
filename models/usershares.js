'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UserShares extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      UserShares.belongsTo(models.User),
      UserShares.belongsTo(models.Shares)
    }
  }
  UserShares.init({
    UserId: DataTypes.INTEGER,
    SharesId: DataTypes.INTEGER,
    boughtShares: DataTypes.INTEGER,
    sharesPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UserShares',
  });
  return UserShares;
};