const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth');
const router = require('express').Router();
const { User } = require('APP/db/models');

module.exports = router;

if (!process.env.GOOGLE_CLIENT_ID || !process.env.GOOGLE_CLIENT_SECRET) {

  console.log('Google client ID / secret not found. Skipping Google OAuth.');

} else {

  const googleConfig = {
    clientID: process.env.GOOGLE_CLIENT_ID
    ,clientSecret: process.env.GOOGLE_CLIENT_SECRET
    ,callbackURL: process.env.GOOGLE_CALLBACK
  };
/* eslint-disable */
  const strategy = new GoogleStrategy(googleConfig, (token, refreshToken, profile, done) => {
    const googleId = profile.id;
    const name = profile.displayName;
    const email = profile.emails[0].value;
    /* eslint-disable */

    User.find({where: {googleId: {[Op.eq]: googleId}}})
      .then(foundUser => (foundUser
        ? done(null, foundUser)
        : User.create({name, email, googleId})
          .then(createdUser => done(null, createdUser))
      ))
      .catch(done);
  });

  passport.use(strategy);

  router.get('/', passport.authenticate('google', {scope: 'email'}));

  router.get('/callback', passport.authenticate('google', {
    successRedirect: '/projects'
    ,failureRedirect: '/login'
  }));

}