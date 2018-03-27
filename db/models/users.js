const crypto = require('crypto');
const Sequelize = require('sequelize');

module.exports = db => db.define('user', {
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
},{
  hooks: {
    beforeCreate: setAndSaltPassword
    ,beforeUpdate: setAndSaltPassword
  },
  defaultScope: {
    attributes: { exclude: ['password', 'salt']}
  }
  ,instanceMethods: {
    checkPassword: function(entry) {
      return User.encryptPassword(entry, this.salt) === this.password;
    }
  }

});

// module.exports.associations = (User) => {
//   // User.hasOne(OAuth)
//   // User.belongsToMany(Thing, {as: 'favorites', through: Favorite})
// }

//password stuff

function generateSalt() {
  return crypto.randomBytes(16).toString('base64')
}
function encryptPassword(entry, salt) {
  return crypto.createHash('RSA-SHA256').update(entry).update(salt).digest('hex');
}

function setAndSaltPassword(user){
  if (user.changed('password')) {
    user.salt = generateSalt();
    user.password = encryptPassword(user.password, user.salt);
  }
}
