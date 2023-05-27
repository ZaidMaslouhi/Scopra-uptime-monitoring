const Sentry = require('@sentry/node')
const { SENTRY_DSN } = require('../../config')
const {
  NotFoundError,
  BadRequestError,
  UnauthorizedError,
  ForbiddenError,
  ConflictError
} = require('./app-errors')

if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: SENTRY_DSN,
    tracesSampleRate: 1.0
  })
}

const ErrorHandler = (error, req, res, next) => {
  let reportError = true;

  [
    BadRequestError,
    UnauthorizedError,
    ForbiddenError,
    NotFoundError,
    ConflictError
  ].forEach((ErrorType) => {
    if (error instanceof ErrorType) reportError = false
  })

  if (reportError && process.env.NODE_ENV === 'production') { Sentry.captureException(error) }

  const statusCode = error.statusCode || 500
  const data = error.data || error.message
  return res.status(statusCode).json(data)
}

module.exports = ErrorHandler
