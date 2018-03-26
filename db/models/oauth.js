'use strict';

const app = require('APP');
const debug = require('debug')(`${app.name}:oauth`);
const Sequelize = require('sequelize');

module.exports = db => {
  const OAuth = db.define('oauths', {
    uid: Sequelize.STRING
    ,provider: Sequelize.STRING
    ,accessToken: Sequelize.STRING
    ,refreshToken: Sequelize.STRING
    ,token: Sequelize.STRING
    ,tokenSecret: Sequelize.STRING
    ,profileJson: Sequelize.JSON,
  }, {
    indexes: [{fields: ['uid'], unique: true}],
  });

  OAuth.V2 = (accessToken, refreshToken, profile, done) =>
    OAuth.findOrCreate({
      where: {
        provider: profile.provider
        ,uid: profile.id,
      }
    })
    .spread(oauth => {
      debug(profile);
      debug('provider:%s will log in user:{name=%s uid=%s}',
        profile.provider,
        profile.displayName,
        profile.id
      );
      oauth.profileJson = profile;
      oauth.accessToken = accessToken;

      return db.Promise.props({
        oauth
        ,user: oauth.getUser()
        ,_saveProfile: oauth.save(),
      });
    })
    .then(({ oauth, user }) => user ||
      OAuth.User.create({
        name: profile.displayName,
      })
      .then(user => db.Promise.props({
        user
        ,_setOauthUser: oauth.setUser(user)
      }))
      .then(({user}) => user)
    )
    .then(user => done(null, user))
    .catch(done);

  // setupStrategy is a wrapper around passport.use, and is called in authentication routes in server/auth.js
  OAuth.setupStrategy =
  ({
    provider,
    strategy,
    config,
    oauth=OAuth.V2,
    passport
  }) => {
    const undefinedKeys = Object.keys(config)
          .map(k => config[k])
          .filter(value => typeof value === 'undefined');
    if (undefinedKeys.length) {
      for (const key in config) {
        if (!config[key]) debug('provider:%s: needs environment var %s', provider, key);
      }
      debug('provider:%s will not initialize', provider);
      return;
    }

    debug('initializing provider:%s', provider);

    passport.use(new strategy(config, oauth));
  };

  return OAuth;
};

module.exports.associations = (OAuth, {User}) => {
  OAuth.User = User;
  OAuth.belongsTo(User);
};
