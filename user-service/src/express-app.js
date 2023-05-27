const cors = require('cors')
const express = require('express')
const { userApi } = require('./api')

const expressApp = () => {
  const app = express()

  // Middlewares
  app.use(express.json({ limit: '1mb' }))
  app.use(cors({ credentials: true, origin: true }))
  app.use(express.urlencoded({ extended: true, limit: '1mb' }))

  // Api
  userApi(app)

  return app
}

module.exports = expressApp
