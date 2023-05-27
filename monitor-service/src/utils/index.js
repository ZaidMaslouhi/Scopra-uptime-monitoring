const { v4: uuidv4 } = require('uuid')
const cron = require('node-cron')
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
