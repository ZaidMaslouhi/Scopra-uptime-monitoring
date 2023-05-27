const { ProjectService } = require('../services')
const UserAuth = require('./middlewares/auth')

module.exports = (app) => {
  const service = new ProjectService()

  // Get user's projects
  app.get('/', UserAuth, async (req, res, next) => {
    try {
      const { user: userId } = req.user

      const { projects } = await service.getProjects(userId)

      return res.status(200).json({ projects })
    } catch (error) {
      next(error)
    }
  })

  // Add new project
  app.post('/', UserAuth, async (req, res, next) => {
  })

  // Update project
  app.put('/', UserAuth, async (req, res, next) => {
  })

  // Delete project
  app.delete('/:id', UserAuth, async (req, res, next) => {
  })
}
