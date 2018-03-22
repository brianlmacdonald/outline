const crypto = require('crypto');
const Sequelize = require('sequelize');
const db = require('../index');

const User = db.define('user', {
  firstName: {
    type: Sequelize.STRING
  }
  ,lastName: {
    type: Sequelize.STRING
  }
  ,email: {
    type: Sequelize.STRING
    ,unique: true
    ,allowNull: false
    ,validate: {
      notEmpty: true
    }
  }
  ,password: {
    type: Sequelize.STRING
  }
  ,salt: {
    type: Sequelize.STRING
  }
  ,googleId: {
    type: Sequelize.STRING
  }
});

module.exports = User;

//password stuff
User.prototype.checkPassword = function(entry) {
  return User.encryptPassword(entry, this.salt) === this.password;
};

User.generateSalt = function() {
  return crypto.randomBytes(16).toString('base64');
};

User.encryptPassword = function(entry, salt) {
  return crypto.createHash('RSA-SHA256').update(entry).update(salt).digest('hex');
};

function setAndSaltPassword(user){
  if (user.changed('password')) {
    user.salt = User.generateSalt();
    user.password = User.encryptPassword(user.password, user.salt);
  }
}

User.beforeCreate(setAndSaltPassword);
User.beforeUpdate(setAndSaltPassword);
