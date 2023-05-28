const Env = require('./envirement')
const PassportConfig = require('./passport')
const { UserServiceEvents } = require('./rpcEvents')
const { RedisPublisher, RedisSubscriber } = require('./redis')

module.exports = {
  ...Env,
  // Passport Configurations
  PassportConfig,
  // Redis
  RedisPublisher,
  RedisSubscriber,
  // RPC services
  USER_SERVICE: 'USER_SERVICE',
  PROJECT_SERVICE: 'PROJECT_SERVICE',
  MONITOR_SERVICE: 'MONITOR_SERVICE',
  // RPC Events
  UserServiceEvents
}
