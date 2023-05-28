const { createClient } = require('redis')
const { REDIS_HOST, REDIS_PORT } = require('./envirement')

const RedisPublisher = createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT
  }
})
RedisPublisher.connect((error) => {
  if (error) console.error(error)
  console.log('RedisPublisher Connected to Redis')
})

const RedisSubscriber = createClient({
  socket: {
    host: REDIS_HOST,
    port: REDIS_PORT
  }
})
RedisSubscriber.connect((error) => {
  if (error) console.error(error)
  console.log('RedisSubscriber Connected to Redis')
})

module.exports = { RedisPublisher, RedisSubscriber }
