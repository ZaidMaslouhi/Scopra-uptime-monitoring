const { FormateData, createCronJob } = require('../utils')
const { MonitorRepository } = require('../database/repository')
const { BadRequestError } = require('../utils/error-handler/app-errors')

class MonitorService {
  constructor () {
    this.repository = new MonitorRepository()
  }

  async getMonitorsByProjectId (projectId) {
    const monitors = await this.repository.FindMonitorsByProjectId(projectId)

    return FormateData({ monitors })
  }

  async createMonitor (monitor) {
    if (!monitor) throw new BadRequestError('Monitor information is required!')

    const { name, uri, projectId } = monitor

    const taskId = createCronJob({
      scheduledTask: (task) => this.repository.MonitorScheduledTask(task, uri)
    })

    const newMonitor = await this.repository.CreateNewMonitor({
      name,
      uri,
      taskId,
      projectId
    })

    return FormateData(newMonitor)
  }

  async updateMonitor (monitor) {
    if (!monitor || !monitor.id) { throw new BadRequestError('Monitor information is required!') }

    const updatedMonitor = await this.repository.UpdateMonitor(monitor)

    return FormateData(updatedMonitor)
  }

  async deleteMonitor (monitor) {
    if (!monitor) throw new BadRequestError('Monitor ID is required!')

    const deletedMonitor = await this.repository.DeleteMonitorById(monitor)

    return FormateData(deletedMonitor)
  }

  async storeResponses () {
    const responses = await this.repository.batchResponses()

    return FormateData({ responses })
  }

  async serveRPCRequest (message) {
    const { event, payload } = message

    switch (event) {
      default:
        return payload
    }
  }
}

module.exports = MonitorService
