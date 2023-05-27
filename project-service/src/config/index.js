const Env = require('./envirement')
const { RedisPublisher, RedisSubscriber } = require('./redis')
const { UserServiceEvents, ProjectServiceEvents } = require('./rpcEvents')

module.exports = {
  ...Env,
  // Redis
  RedisPublisher,
  RedisSubscriber,
  // RPC Services
  USER_SERVICE: 'USER_SERVICE',
  PROJECT_SERVICE: 'PROJECT_SERVICE',
  MONITOR_SERVICE: 'MONITOR_SERVICE',
  // RPC Events
  UserServiceEvents,
  ProjectServiceEvents
}
