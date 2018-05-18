const router = require('express').Router();
const Op = require('sequelize').Op;

const { User, Project } = require('APP/db/');
module.exports = router;

const mustHavePassword = (req, res, next) => {
  if (!req.body.password) {
    return next(Error('Unauthorized'));
  } else {
    return next();
  }
};

router.post('/login', mustHavePassword, (req, res, next) => {
  return User.findOne({
    where: {email: {[Op.eq]: req.body.email}}})
    .then(user => {
      if (!user) {
        return res.status(401).send('User not found');
      } else if (!user.checkPassword(req.body.password)) {
        return res.status(401).send('Incorrect password');
      } else {
        return req.login(user, (err) => {
          if (err) { return next(err); } 
          return res.json(cleanUser(user));
        });
      }
    })
    .catch(next);
});

router.post('/signup', mustHavePassword, (req, res, next) => {
  return User.create(req.body)
    .then(newUser => req.login(newUser, err => (err ?
      next(err) :
      res.json(cleanUser(newUser)))))
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(401).send('User already exists');
      } else {
        return next(err);
      }
    });
});

router.post('/verify', (req, res, next) => {
  return User.findOne({
    where: {email: {[Op.eq]: req.body.email}}
  })
  .then(user => {
    if (!user) {
        return res.status(401).send('User not found');
      } else if (!user.checkPassword(req.body.password)) {
        return res.status(401).send('Incorrect password');
      } else {
        return res.sendStatus(204);
      }
  })
  .catch(next);
});

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  return res.json(req.user);
});

router.use('/google', require('./google'));

function cleanUser(user) {
  user.set('password');
  user.set('salt');
  return user;
}
