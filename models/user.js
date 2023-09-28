'use strict';
const bcrypt = require('bcryptjs')
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasOne(models.Detail),
      User.belongsTo(models.Type)
      User.hasMany(models.UserShares)
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Username cannot be empty'
        },
        len: {
          args: [3, 12],
          msg: 'Username at least 3-12 characters'
        },
        // validate username is not already taken
        isUnique: function (value, next) {
          User.findOne({
              where: {
                username: value
              }
            })
            .then((user) => {
              if (user) {
                return next('Username already in use!');
              }
              next();
            })
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Password cannot be empty'
        },
        len: {
          args: [6, 32],
          msg: 'Password at least 6-32 characters'
        }
      }
    },
    TypeId: {
      type: DataTypes.INTEGER
    },
    isAdmin: {
      type: DataTypes.BOOLEAN
    }
  }, {
    hooks: {
      beforeCreate: (user, options) => {
        console.log(user);
        user.TypeId = 1,
        user.password = bcrypt.hashSync(user.password, 10)
        if (user.isAdmin == 1) {
          user.isAdmin = true
        } else {
          user.isAdmin = false
        }
      }
    },
    sequelize,
    modelName: 'User',
  });
  return User;
};