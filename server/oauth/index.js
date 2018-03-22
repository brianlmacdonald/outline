const router = require('express').Router();
const User = require('APP/db/models/users');
module.exports = router;

const mustHavePassword = (req, res, next) => {
  console.log('INSIDE GATEKEEPER', req.body);
  if (!req.body.password) {
    return next(Error('Unauthorized'));
  } else {
    return next();
  }
};

router.post('/login', mustHavePassword, (req, res, next) => {
  return User.findOne({where: {email: req.body.email}})
    .then(user => {
      if (!user) {
        return res.status(401).send('User not found');
      } else if (!user.correctPassword(req.body.password)) {
        return res.status(401).send('Incorrect password');
      } else {
        return req.login(user, err => (err ? next(err) : res.json(user)));
      }
    })
    .catch(next);
});

router.post('/signup', mustHavePassword, (req, res, next) => {
  return User.create(req.body)
    .then(createdUser => {
      return User.findOne({where: {id: createdUser.id}})
      .then(user => {
        return req.login(user, err => (err ? next(err) : res.json(user)));
      })
      .catch(next);
    })
    .catch(err => {
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(401).send('User already exists');
      } else {
        return next(err);
      }
    });
});

router.post('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/me', (req, res) => {
  return res.json(req.user);
});

router.use('/google', require('./google'));
