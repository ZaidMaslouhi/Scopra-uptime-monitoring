const Env = require('./envirement')

module.exports = {
  ...Env,
  // Sentry Data Source Name
  SENTRY_DSN: process.env.SENTRY_DSN
}
