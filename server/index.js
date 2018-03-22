'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const { resolve } = require('path');
const PrettyError = require('pretty-error');
const finalHandler = require('finalhandler');
const morgan = require('morgan');
const session = require('express-session');
const passport = require('passport');


const pkg = require('APP');

const app = express();

if (!pkg.isProduction && !pkg.isTesting) {
  app.use(morgan('dev'));
}


const prettyError = new PrettyError;
prettyError.skipNodeFiles();
prettyError.skipPackage('express');

module.exports = app

  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(express.static(resolve(__dirname, '..', 'public')))
  .use(session({secret: 'super secret', resave: false, saveUninitialized: false}))
  .use(passport.initialize())
  .use(passport.session())
  .use('/api', require('./routes'))
  .use((req, res, next) => {
    if (path.extname(req.path).length) {
      const err = new Error('Not found');
      err.status = 404;
      next(err);
    } else {
      next();
    }
  })
  .get('/*', (_, res) => res.sendFile(resolve(__dirname, '..', 'public', 'index.html')))
  .use((err, req, res, next) => {
    console.error(prettyError.render(err));
    finalHandler(req, res)(err);
  });

if (module === require.main) {
  const server = app.listen(
    pkg.port,
    () => {
      console.log(`Guess what? ${pkg.name} started! Pew pew pew!`);
      const { address, port } = server.address();
      const host = address === '::' ? 'localhost' : address;
      const urlSafeHost = host.includes(':') ? `[${host}]` : host;
      console.log(`Pew pew pewing on http://${urlSafeHost}:${port}`);
    }
  );
}
