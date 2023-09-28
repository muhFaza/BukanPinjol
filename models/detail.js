'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Detail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    generateAccountNo() {
      const length = 5
      const min = Math.pow(10, length - 1); // Minimum value with 5 digits
      const max = Math.pow(10, length) - 1; // Maximum value with 5 digits
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    static formatName(fullName) {
      fullName = fullName.split(' ')
      fullName = fullName.map(el => {
        return el[0].toUpperCase() + el.slice(1)
      })
      return fullName.join(' ')
    }

    static associate(models) {
      // define association here
      Detail.belongsTo(models.User)
    }
  }
  Detail.init({
    accountNo: DataTypes.INTEGER,
    fullName: DataTypes.STRING,
    balance: DataTypes.INTEGER,
    UserId: DataTypes.INTEGER
  }, {
    hooks: {
      beforeCreate(detail, options) {
        detail.accountNo = detail.generateAccountNo()
        detail.balance = 10000
        detail.fullName = Detail.formatName(detail.fullName)
      }
    },
    sequelize,
    modelName: 'Detail',
  });
  return Detail;
};