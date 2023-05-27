const { v4: uuidv4 } = require('uuid')
const cron = require('node-cron')
const jwt = require('jsonwebtoken')
const { NotFoundError, APIError } = require('./error-handler/app-errors')
const { RedisPublisher, WSS, MONITOR_RESPONSE } = require('../config')
const { createClient } = require('redis')

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

// Cron Job
module.exports.createCronJob = ({
  scheduledTask,
  cronExpression = '*/5 * * * * *'
}) => {
  try {
    const taskId = uuidv4()

    cron.schedule(cronExpression, () => scheduledTask(taskId), {
      name: taskId
    })

    return taskId
  } catch (error) {
    console.error(error)
  }
}

module.exports.stopCronJob = (taskId) => {
  try {
    const task = cron.getTasks().get(taskId)

    task.stop()

    return taskId
  } catch (error) {
    console.error(error)
  }
}

module.exports.ResumeCronJob = (taskId) => {
  try {
    const task = cron.getTasks().get(taskId)

    task.start()

    return taskId
  } catch (error) {
    console.error(error)
  }
}

// Redis - Message Broker
module.exports.PublishMessage = async (channel, message) => {
  const listeners = await RedisPublisher.publish(
    channel,
    JSON.stringify(message)
  )
  return listeners
}

async function ClientSubscriber (subscriber, channel, callBack) {
  await subscriber.subscribe(channel, callBack)
}

// Redis Client
async function CreateRedisSubscriber (subscriber) {
  if (subscriber) {
    // Unsubscribe if already subscribed to the channel
    subscriber.unsubscribe()
    subscriber.quit()
  }
  subscriber = createClient()
  subscriber.connect((error) => {
    if (error) console.error(error)
    console.log('Redis Subscriber Connected to Redis')
  })
  return subscriber
}

module.exports.startWebSocketServer = () => {
  try {
    WSS.on('connection', async (ws) => {
      let wsSubscriber = null

      ws.on('message', async (message) => {
        const data = JSON.parse(message)

        wsSubscriber = CreateRedisSubscriber(wsSubscriber)

        ClientSubscriber(wsSubscriber, MONITOR_RESPONSE, (message) => {
          const response = JSON.parse(message)
          if (data.includes(response.task)) {
            this.sendSocketMessage(ws, response)
          }
        })
      })

      ws.on('close', async () => {
        if (wsSubscriber) {
          wsSubscriber.unsubscribe()
          wsSubscriber.quit()
        }
      })
    })
  } catch (error) {
    throw new APIError('Unable to connect to the websocket server!')
  }
}
