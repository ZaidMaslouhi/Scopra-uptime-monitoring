const UserAuth = require('./middlewares/auth')
const { MonitorService } = require('../services')

module.exports = (app) => {
  const service = new MonitorService()

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

      return res.status(201).json({ monitor: newMonitor })
    } catch (error) {
      next(error)
    }
  })

  // Update Monitor
  app.put('/', async (req, res, next) => {
  })

  // Delete Monitor
  app.delete('/:monitorId', async (req, res, next) => {
  })
}
