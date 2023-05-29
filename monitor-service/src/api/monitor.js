const UserAuth = require('./middlewares/auth')
const { MonitorService } = require('../services')
const { PROJECT_SERVICE, ProjectServiceEvents } = require('../config')
const { APIError } = require('../utils/error-handler/app-errors')
const { messageRPC, publisherRPC } = require('../utils')
const swaggerUi = require('swagger-ui-express')
const { swaggerDocument } = require('../config')

module.exports = (app) => {
  const service = new MonitorService()

  // Swagger Documentation
  app.use('/api', swaggerUi.serve, swaggerUi.setup(swaggerDocument))

  // Get monitors by project
  app.get('/:projectId', UserAuth, async (req, res, next) => {
    try {
      const { projectId } = req.params

      const monitors = await service.getMonitorsByProjectId(projectId)

      return res.status(200).json(monitors)
    } catch (error) {
      next(error)
    }
  })

  // Add new monitor
  app.post('/', UserAuth, async (req, res, next) => {
    try {
      const { monitor } = req.body

      const newMonitor = await service.createMonitor(monitor)

      const message = messageRPC({
        event: ProjectServiceEvents.ADD_MONITOR_TO_PROJECT,
        payload: {
          monitorId: newMonitor._id,
          projectId: newMonitor.projectId
        }
      })

      const response = await publisherRPC(PROJECT_SERVICE, message)
      if (!response) throw new APIError('Project service is unavailable!')

      return res.status(201).json({ monitor: newMonitor })
    } catch (error) {
      next(error)
    }
  })

  // Update Monitor
  app.put('/', UserAuth, async (req, res, next) => {
    try {
      const { monitor } = req.body

      const updatedMonitor = await service.updateMonitor(monitor)

      return res.status(200).json({ monitor: updatedMonitor })
    } catch (error) {
      next(error)
    }
  })

  // Delete Monitor
  app.delete('/:monitorId', UserAuth, async (req, res, next) => {
    try {
      const monitor = { id: req.params.monitorId }

      const deletedMonitor = await service.deleteMonitor(monitor)

      if (deletedMonitor._id && deletedMonitor.projectId) {
        const message = messageRPC({
          event: ProjectServiceEvents.DELETE_MONITOR_FROM_PROJECT,
          payload: {
            monitorId: deletedMonitor._id,
            projectId: deletedMonitor.projectId
          }
        })

        const response = await publisherRPC(PROJECT_SERVICE, message)
        if (!response) throw new APIError('Project service is unavailable!')
      }

      return res.status(200).json({ monitor: deletedMonitor })
    } catch (error) {
      next(error)
    }
  })
}
