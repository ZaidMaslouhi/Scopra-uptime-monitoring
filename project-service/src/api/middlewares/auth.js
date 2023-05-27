const { ACCESS_TOKEN_KEY } = require('../../config')
const { ValidateToken } = require('../../utils')

module.exports = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    if (!token) throw new Error('Authorization Token unavailable!')

    const isAuthorized = ValidateToken(
      req,
      token.toString().split(' ')[1],
      ACCESS_TOKEN_KEY
    )

    if (!isAuthorized) { throw new Error('Not authorized to access resources!') }
    next()
  } catch (error) {
    next(error)
  }
}
