const cors = require('cors')
const express = require('express')
const { userApi } = require('./api')
const session = require('express-session')
const { APP_SECRET } = require('./config')
const cookieParser = require('cookie-parser')
const ErrorHandler = require('./utils/error-handler')

const expressApp = () => {
  const app = express()

  // Middlewares
  app.use(cookieParser())
  app.use(express.json({ limit: '1mb' }))
  app.use(cors({ credentials: true, origin: true }))
  app.use(express.urlencoded({ extended: true, limit: '1mb' }))
  app.use(
    session({
      secret: APP_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }
    })
  )

  // Api
  userApi(app)

  // Error Handler
  app.use(ErrorHandler)

  return app
}

module.exports = expressApp
