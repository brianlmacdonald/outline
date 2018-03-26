'use strict';
const bcrypt = require('bcryptjs');
const Sequelize = require('sequelize');

module.exports = db => db.define('users', {
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
  ,password_digest: Sequelize.STRING
  ,password: Sequelize.VIRTUAL
}
, {
  indexes: [{fields: ['email'], unique: true}]
  , hooks: {
    beforeCreate: setEmailAndPassword
    ,beforeUpdate: setEmailAndPassword,
  }
  , defaultScope: {
    attributes: {exclude: ['password_digest']}
  }
  , instanceMethods: {
    // This method is a Promisified bcrypt.compare
    authenticate(plaintext) {
      return bcrypt.compare(plaintext, this.password_digest);
    }
  }
});

module.exports.associations = (User, {OAuth}) => {
  User.hasOne(OAuth);
};

function setEmailAndPassword(user) {
  user.email = user.email && user.email.toLowerCase();
  if (!user.password) return Promise.resolve(user);

  return bcrypt.hash(user.get('password'), 10)
    .then(hash => user.set('password_digest', hash));
}
