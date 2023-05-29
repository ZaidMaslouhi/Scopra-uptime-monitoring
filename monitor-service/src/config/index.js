const axios = require('./axios')
const Env = require('./envirement')
const WebSocketServer = require('./webSocket')
const swaggerDocument = require('./swagger.json')
const { ProjectServiceEvents } = require('./rpcEvents')
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
  // RPC services
  USER_SERVICE: 'USER_SERVICE',
  PROJECT_SERVICE: 'PROJECT_SERVICE',
  MONITOR_SERVICE: 'MONITOR_SERVICE',
  // RPC Events
  ProjectServiceEvents,
  // Monitor Response Queue
  MONITOR_RESPONSE: 'MONITOR_RESPONSE',
  // Swagger Docs
  swaggerDocument
}
