const Sequelize = require('sequelize')
const debug = require('debug')










function createAndSync(force = app.isTesting, retries = 0, maxRetries = 5) {
  return db.sync({ force })
    .then(() => debug(`Synced models to db ${url}`))
    .catch(fail => {
      // Don't do this auto-create nonsense in prod, or
      // if we've retried too many times.
      if (app.isProduction || retries > maxRetries) {
        console.error(chalk.red(`********** database error ***********`))
        console.error(chalk.red(`    Couldn't connect to ${url}`))
        console.error()
        console.error(chalk.red(fail))
        console.error(chalk.red(`*************************************`))
        return
      }
      // Otherwise, do this autocreate nonsense
      debug(`${retries ? `[retry ${retries}]` : ''} Creating database ${name}...`)
      return new Promise(resolve =>
        // 'child_process.exec' docs: https://nodejs.org/api/child_process.html#child_process_child_process_exec_command_options_callback
        require('child_process').exec(`createdb "${name}"`, resolve)
      ).then(() => createAndSync(true, retries + 1))
    })
}