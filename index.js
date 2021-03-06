'use strict';

const { resolve } = require('path')
  , chalk = require('chalk')
  , pkg = require('./package.json')
  , debug = require('debug')(`${pkg.name}:boot`);

const env = process.env
  , secretsFile = resolve(require('homedir')(), `.${pkg.name}.env`);

try {
  Object.assign(env, require(secretsFile));
} catch (error) {
  debug('%s: %s', secretsFile, error.message);
  debug('%s: env file not found or invalid, moving on', secretsFile);
}

module.exports = {
  get name() { return pkg.name; }
  ,get isTesting() { return env.NODE_ENV === 'test'; }
  ,get isProduction() {
    return env.NODE_ENV === 'production';
  }
  ,get isDevelopment() {
    return env.NODE_ENV === 'development';
  }
  ,get baseUrl() {
    return env.BASE_URL || `http://localhost:${module.exports.port}`;
  }
  ,get port() {
    return env.PORT || 8080;
  }
  ,get root() {
    return __dirname;
  }
  ,package: pkg
  ,env,
};
