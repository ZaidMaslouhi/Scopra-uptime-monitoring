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

      return res.status(200).json({ monitor: deletedMonitor })
    } catch (error) {
      next(error)
    }
  })
}
