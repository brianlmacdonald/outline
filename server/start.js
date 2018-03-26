'use strict';

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const {resolve} = require('path');
const passport = require('passport');
const PrettyError = require('pretty-error');
const finalHandler = require('finalhandler');
const morgan = require('morgan');
// PrettyError docs: https://www.npmjs.com/package/pretty-error

// Bones has a symlink from node_modules/APP to the root of the app.
// That means that we can require paths relative to the app root by
// saying require('APP/whatever').
//
// This next line requires our root index.js:
const pkg = require('APP');

const app = express();

if (!pkg.isProduction && !pkg.isTesting) {
  // Logging middleware (dev only)
  app.use(morgan('dev'));
}

const prettyError = new PrettyError;

prettyError.skipNodeFiles();
prettyError.skipPackage('express');

module.exports = app
  .use(require('cookie-session')({
    name: 'session'
    ,keys: [process.env.SESSION_SECRET || 'an insecure secret key'],
  }))
  .use(bodyParser.urlencoded({ extended: true }))
  .use(bodyParser.json())
  .use(passport.initialize())
  .use(passport.session())
  .use(express.static(resolve(__dirname, '..', 'public')))
  .use('/api', require('./api'))
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
      console.log(`--- Started HTTP Server for ${pkg.name} ---`);
      const { address, port } = server.address();
      const host = address === '::' ? 'localhost' : address;
      const urlSafeHost = host.includes(':') ? `[${host}]` : host;
      console.log(`Listening on http://${urlSafeHost}:${port}`);
    }
  );
}
