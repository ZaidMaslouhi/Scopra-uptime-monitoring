const jwt = require('jsonwebtoken')
const { NotFoundError } = require('./error-handler/app-errors')

// Data validation
module.exports.FormateData = (data) => {
  if (data) {
    return { ...data }
  } else {
    throw new NotFoundError('Data Not found!')
  }
}

// JWT
module.exports.ValidateToken = (req, token, key) => {
  try {
    const payload = jwt.verify(token, key)
    req.user = payload
    return true
  } catch (error) {
    return false
  }
}

module.exports.GenerateToken = (payload, token, expiresIn) => {
  try {
    return jwt.sign(payload, token, { expiresIn })
  } catch (error) {
    return false
  }
}
