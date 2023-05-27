const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

// Cookies
module.exports.SetCookie = async (res, name, value) => {
  res.cookie(name, value, {
    httpOnly: true,
    maxAge: 24 * 60 * 60 * 1000,
    secure: process.env.NODE_ENV === 'production', // TODO: Set true in production
    sameSite: 'None'
  })
}

module.exports.ClearCookie = async (res, name) => {
  res.clearCookie(name, {
    httpOnly: true,
    secure: true,
    sameSite: 'None'
  })
}

// Data validation
module.exports.FormateData = (data) => {
  if (data) {
    return { ...data }
  } else {
    throw new Error('Data Not found!')
  }
}

module.exports.GeneratePassword = async (password, salt = 10) => {
  return await bcrypt.hash(password, salt)
}

module.exports.ValidatePassword = async (enteredPassword, savedPassword) => {
  return await bcrypt.compare(enteredPassword, savedPassword)
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
    return error
  }
}
