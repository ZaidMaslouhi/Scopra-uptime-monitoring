const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { NotFoundError } = require('./error-handler/app-errors')
const { RedisSubscriber, RedisPublisher } = require('../config')

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
    throw new NotFoundError('Data Not found!')
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

// RPC - Message Broker
module.exports.subscriberRPC = async (channel, service) => {
  await RedisSubscriber.subscribe(channel, async (message) => {
    const state = JSON.parse(message)
    await service.serveRPCRequest(state)
  })
}

module.exports.publisherRPC = async (channel, message) => {
  return await RedisPublisher.publish(channel, message)
}

module.exports.messageRPC = ({ event, payload }) => {
  return JSON.stringify({
    event,
    payload
  })
}
