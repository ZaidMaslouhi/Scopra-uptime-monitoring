const path = require('path')
const dotenv = require('dotenv')

if (process.env.NODE_ENV === 'production') {
  const configFile = '.env'
  dotenv.config({ path: path.join(__dirname, configFile) })
} else {
  const configFile = './.env.dev'
  dotenv.config({ path: configFile })
}

module.exports = {
  // App variables
  APP_SECRET: process.env.APP_SECRET,
  PORT: process.env.PORT || 8002,
  // DataBase
  DB_URI: process.env.DB_URI,
  // JWT
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
  // Sentry Data Source Name
  SENTRY_DSN: process.env.SENTRY_DSN,
  // Redis
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT
}
