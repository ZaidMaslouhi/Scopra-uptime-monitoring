const { Axios, RedisPublisher, MONITOR_RESPONSE } = require('../../config')
const { PublishMessage } = require('../../utils')
const { APIError } = require('../../utils/error-handler/app-errors')
const { MonitorModel } = require('../models')

class MonitorRepository {
  async FindMonitorsByProjectId (projectId) {
    try {
      const monitors = await MonitorModel.find({ projectId })

      return monitors ?? []
    } catch (_) {
      throw new APIError('Unable to find monitor')
    }
  }

  async CreateNewMonitor ({ name, taskId, uri, projectId }) {
    try {
      const newMonitor = await MonitorModel.create({
        name,
        taskId,
        uri,
        projectId
      })

      return !newMonitor ? {} : newMonitor.toJSON()
    } catch (_) {
      throw new APIError('Unable to create new monitor')
    }
  }

  async UpdateMonitor (monitor) {
    try {
      const updatedMonitor = await MonitorModel.findByIdAndUpdate(
        monitor.id,
        { name: monitor.name },
        { new: true }
      )

      return !updatedMonitor ? {} : updatedMonitor.toJSON()
    } catch (_) {
      throw new APIError('Unable to update monitor')
    }
  }

  async DeleteMonitorById (monitor) {
    try {
      const deletedMonitor = await MonitorModel.findByIdAndRemove(monitor.id)

      return !deletedMonitor ? {} : deletedMonitor.toJSON()
    } catch (_) {
      throw new APIError('Unable to remove monitor')
    }
  }

  async MonitorScheduledTask (taskId, URI) {
    const response = await Axios.head(URI, {
      validateStatus: false
    })

    const duration = response.headers['request-duration']
    const cert = response.request.socket.getPeerCertificate()
    const expirationDate =
      Object.keys(cert).indexOf('valid_to') > -1
        ? new Date(cert.valid_to).toLocaleDateString('en-GB')
        : '-'

    const task = Object.freeze({
      task: taskId,
      uri: URI,
      status: `${response.status} ${response.statusText}`,
      response: duration,
      SSLExpiration: expirationDate
    })

    RedisPublisher.hSet(taskId, Date.now().toString(), JSON.stringify(task))
    PublishMessage(MONITOR_RESPONSE, task)

    return task
  }
}

module.exports = MonitorRepository
