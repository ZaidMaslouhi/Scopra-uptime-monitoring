const cors = require('cors')
const express = require('express')
const session = require('express-session')
const { APP_SECRET } = require('./config')
const { projectAPI } = require('./api')

const expressApp = () => {
  const app = express()

  // Middlewares
  app.use(express.json({ limit: '1mb' }))
  app.use(express.urlencoded({ extended: true, limit: '1mb' }))
  app.use(cors({ credentials: true, origin: true }))
  app.use(
    session({
      secret: APP_SECRET,
      resave: false,
      saveUninitialized: false,
      cookie: { secure: false }
    })
  )

  // Api
  projectAPI(app)
  return app
}

module.exports = expressApp
