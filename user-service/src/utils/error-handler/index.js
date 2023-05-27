
const ErrorHandler = (error, req, res, next) => {
  const statusCode = error.statusCode || 500
  const data = error.data || error.message
  return res.status(statusCode).json(data)
}

module.exports = ErrorHandler
