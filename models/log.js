'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    get formatDate() {
      return this.createdAt.toDateString()
    }
    
    static associate(models) {
      // define association here
      Log.belongsTo(models.User),
      Log.belongsTo(models.Shares)
    }
  }
  Log.init({
    UserId: DataTypes.INTEGER,
    ShareId: DataTypes.INTEGER,
    boughtShares: DataTypes.INTEGER,
    sharesPrice: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Log',
  });
  return Log;
};