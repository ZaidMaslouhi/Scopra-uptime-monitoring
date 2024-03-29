const { ProjectServiceEvents } = require('../config')
const { ProjectRepository } = require('../database/repository')
const { FormateData } = require('../utils')
const {
  BadRequestError,
  APIError
} = require('../utils/error-handler/app-errors')

class ProjectService {
  constructor () {
    this.repository = new ProjectRepository()
  }

  async getProjects (userId) {
    const projects = await this.repository.FindProjects(userId)

    return FormateData({ projects })
  }

  async createProject (project) {
    if (!project) { throw new BadRequestError('Project information are not defined!') }

    const newProject = await this.repository.CreateProject(project)

    if (!newProject) throw new APIError('Cannot create new project!')

    return FormateData(newProject)
  }

  async updateProject (project) {
    const updatedProject = await this.repository.UpdateProject(project)

    if (!updatedProject) throw new APIError('Cannot update project!')

    return FormateData(updatedProject)
  }

  async deleteProject (project) {
    const deletedProject = await this.repository.DeleteProject(project)

    if (!deletedProject) throw new APIError('Cannot delete project!')

    return FormateData(deletedProject)
  }

  async serveRPCRequest (message) {
    const { event, payload } = message

    switch (event) {
      case ProjectServiceEvents.ADD_MONITOR_TO_PROJECT:
        return this.repository.AddMonitorToProject({
          monitorId: payload.monitorId,
          projectId: payload.projectId
        })

      case ProjectServiceEvents.DELETE_MONITOR_FROM_PROJECT:
        return this.repository.DeleteMonitorFromProject({
          monitorId: payload.monitorId,
          projectId: payload.projectId
        })

      default:
        break
    }
  }
}

module.exports = ProjectService
