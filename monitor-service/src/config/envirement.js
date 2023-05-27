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
  PORT: process.env.PORT || 8003,
  // JWT
  REFRESH_TOKEN_KEY: process.env.REFRESH_TOKEN_KEY,
  ACCESS_TOKEN_KEY: process.env.ACCESS_TOKEN_KEY,
  // DataBase
  DB_URI: process.env.DB_URI,
  // WebSocket
  WS_HOST: process.env.WS_HOST || 'localhost',
  WS_PORT: process.env.WS_PORT || 4000
}
