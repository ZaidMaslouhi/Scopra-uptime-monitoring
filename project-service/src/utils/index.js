const jwt = require('jsonwebtoken')
const { RedisPublisher, RedisSubscriber } = require('../config')
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
