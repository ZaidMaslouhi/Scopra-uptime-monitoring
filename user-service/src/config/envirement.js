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
  PORT: process.env.PORT || 8001,
  // DataBase
  DB_URI: process.env.DB_URI,
  // JWT
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
  // Google auth
  GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL: process.env.GOOGLE_CALLBACK_URL,
  // Github auth
  GITHUB_CLIENT_ID: process.env.GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET: process.env.GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL: process.env.GITHUB_CALLBACK_URL,
  // Sentry Data Source Name
  SENTRY_DSN: process.env.SENTRY_DSN,
  // Redis
  REDIS_HOST: process.env.REDIS_HOST,
  REDIS_PORT: process.env.REDIS_PORT
}
