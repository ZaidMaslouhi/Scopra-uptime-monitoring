const axios = require('./axios')
const Env = require('./envirement')
const WebSocketServer = require('./webSocket')
const { RedisPublisher, RedisSubscriber } = require('./redis')

module.exports = {
  ...Env,
  // Axios
  Axios: axios,
  // Redis
  RedisPublisher,
  RedisSubscriber,
  // Websockets
  WSS: WebSocketServer,
  // Monitor Response Queue
  MONITOR_RESPONSE: 'MONITOR_RESPONSE'
}
