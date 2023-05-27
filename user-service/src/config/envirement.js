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
  PORT: process.env.PORT || 3000
}
