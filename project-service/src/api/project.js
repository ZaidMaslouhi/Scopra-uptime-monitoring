const UserAuth = require('./middlewares/auth')
const { ProjectService } = require('../services')
const {
  BadRequestError,
  APIError
} = require('../utils/error-handler/app-errors')
const { publisherRPC, subscriberRPC, messageRPC } = require('../utils')
const {
  USER_SERVICE,
  PROJECT_SERVICE,
  UserServiceEvents
} = require('../config')

module.exports = (app) => {
  const service = new ProjectService()

  // RPC Subscriber
  subscriberRPC(PROJECT_SERVICE, service)

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
    try {
      if (!req.body.project) throw new BadRequestError('Project is required!')

      const project = { ...req.body.project, userId: req.user.user }

      const newProject = await service.createProject(project)

      if (project?.isDefault) {
        const message = messageRPC({
          event: UserServiceEvents.SET_DEFAULT_PROJECT,
          payload: {
            userId: newProject.userId,
            projectId: newProject._id
          }
        })

        const response = await publisherRPC(USER_SERVICE, message)
        if (!response) throw new APIError('User service is unavailable!')
      }

      return res.status(201).json({ project: newProject })
    } catch (error) {
      next(error)
    }
  })

  // Update project
  app.put('/', UserAuth, async (req, res, next) => {
    try {
      if (!req.body.project) throw new BadRequestError('Project is required!')

      const { project } = req.body

      const updatedProject = await service.updateProject(project)

      return res.status(200).json({ project: updatedProject })
    } catch (error) {
      next(error)
    }
  })

  // Delete project
  app.delete('/:id', UserAuth, async (req, res, next) => {
    try {
      const project = { id: req.params.id }

      const deletedProject = await service.deleteProject(project)

      return res.status(200).json({
        project: deletedProject
      })
    } catch (error) {
      next(error)
    }
  })
}
