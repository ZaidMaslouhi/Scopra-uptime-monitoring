const { ACCESS_TOKEN_KEY } = require('../../config')
const { ValidateToken } = require('../../utils')
const {
  ForbiddenError,
  NotFoundError
} = require('../../utils/error-handler/app-errors')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) throw new NotFoundError('Authorization Token unavailable!')

    const isAuthorized = ValidateToken(
      req,
      token.toString().split(' ')[1],
      ACCESS_TOKEN_KEY
    )

    if (!isAuthorized) { throw new ForbiddenError('Not authorized to access resources!') }
    next()
  } catch (error) {
    next(error)
  }
}
