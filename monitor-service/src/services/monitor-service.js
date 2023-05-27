const { v4: uuidv4 } = require('uuid')
const { FormateData } = require('../utils')
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

    const taskId = uuidv4()
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
}

module.exports = MonitorService
