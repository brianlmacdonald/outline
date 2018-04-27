'use strict';
const app = require('APP')
  , debug = require('debug')(`${app.name}:db`)
  , chalk = require('chalk')
  , Sequelize = require('sequelize')

  , name = (app.env.DATABASE_NAME || app.name) +
    (app.isTesting ? '_test' : '')
  , url = app.env.DATABASE_URL || `postgres://localhost:5432/${name}`;

debug(chalk.yellow(`Opening database connection to ${url}`));
const db = module.exports = new Sequelize(url, {
  logging: require('debug')('sql')
  , define: {
    underscored: true
    , freezeTableName: true
    , timestamps: true
  }
});

Object.assign(db, require('./models')(db), { createAndSync });
db.didSync = db.createAndSync();


function createAndSync(force = app.isTesting, retries = 0, maxRetries = 5) {
  return db.sync({ force })
    .then(() => debug(`Synced models to db ${url}`))
    .catch(fail => {
      if (app.isProduction || retries > maxRetries) {
        console.error(chalk.red('********** database error ***********'));
        console.error(chalk.red(`    Couldn't connect to ${url}`));
        console.error();
        console.error(chalk.red(fail));
        console.error(chalk.red('*************************************'));
        return;
      }
      debug(`${retries ? `[retry ${retries}]` : ''} Creating database ${name}...`);
      return new Promise(resolve =>
        require('child_process').exec(`createdb "${name}"`, resolve)
      ).then(() => createAndSync(true, retries + 1));
    });
}
