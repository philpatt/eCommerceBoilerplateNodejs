'use strict';

var bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: {
          msg: 'Invalid email address'
        }
      }
    },
    firstname: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    lastname: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [1, 99],
          msg: 'Name must be between 1 and 99 characters'
        }
      }
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        len: {
          args: [3, 99],
          msg: 'Password must be between 8 and 99 characters'
        }
      }
    },
    permissions: {
      type: DataTypes.STRING,
    },
  }, {
      hooks: {
        beforeCreate: function (createdUser, options) {
          // hash the password
          var hash = bcrypt.hashSync(createdUser.password, 10);
          // store the hash as the user's password
          createdUser.password = hash;
        }
      },
  });
  user.associate = function(models) {
    // associations can be defined here
  };

  // Function to compare entered password to hashed password
  user.prototype.validPassword = function (passwordTyped) {
    return bcrypt.compareSync(passwordTyped, this.password);
  };

  // Function to remove password before sending the user object
  user.prototype.toJSON = function () {
    var userData = this.get();
    delete userData.password;
    return userData;
  }
  return user;
};