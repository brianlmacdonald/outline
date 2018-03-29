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
      isEmail: true
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
  }
});

module.exports.associations = function(Model, {Project}) {
  Model.hasMany(Project);
};

module.exports.scopes = function(Model, {Project}) {
  Model.addScope('userProjects', {
    include: [
      {
        model: Project, attributes: {
          include: ['id', 'name']
        }
      }
    ]
  })
};

module.exports.instanceMethods = function(User) {
  User.prototype.checkPassword = function(entry) {
    return encryptPassword(entry, this.salt) === this.password;
  }
};

//password stuff

function generateSalt() {
  return crypto.randomBytes(16).toString('base64')
};

function encryptPassword(entry, salt) {
  return crypto.createHash('RSA-SHA256').update(entry).update(salt).digest('hex');
};

function setAndSaltPassword(user){
  if (user.changed('password')) {
    user.salt = generateSalt();
    user.password = encryptPassword(user.password, user.salt);
  }
};
