const { APIError } = require('../../utils/error-handler/app-errors')
const { ProjectModel } = require('../models')

class ProjectRepository {
  async FindProjects (userId) {
    try {
      const projects = await ProjectModel.find({ userId })

      return projects
    } catch (_) {
      throw new APIError('Unable to Find Project')
    }
  }

  async CreateProject (project) {
    try {
      const newProject = await ProjectModel.create({
        name: project.name,
        userId: project.userId
      })

      return newProject?.toJSON()
    } catch (_) {
      throw new APIError('Unable to Create New Project')
    }
  }

  async AddMonitorToProject ({ monitorId, projectId }) {
    try {
      const update = {
        $push: {
          monitors: monitorId
        }
      }

      const updatedPorject = await ProjectModel.updateOne(
        { _id: projectId },
        update
      )

      return updatedPorject?.toJSON()
    } catch (_) {
      throw new APIError('Unable to update monitor list')
    }
  }

  async UpdateProject (project) {
    try {
      const updatedProject = await ProjectModel.findByIdAndUpdate(
        { _id: project.id },
        { name: project.name },
        { new: true }
      )

      return updatedProject?.toJSON()
    } catch (_) {
      throw new APIError('Unable to update project')
    }
  }

  async DeleteProject (project) {
    try {
      const deletedProject = await ProjectModel.findByIdAndDelete({
        _id: project.id
      })

      return deletedProject?.toJSON()
    } catch (_) {
      throw new APIError('Unable to delete project')
    }
  }

  async DeleteMonitorFromProject ({ monitorId, projectId }) {
    try {
      const update = {
        $pull: {
          monitors: monitorId
        }
      }

      const updatedPorject = await ProjectModel.updateOne(
        { _id: projectId },
        update
      )

      return updatedPorject?.toJSON()
    } catch (_) {
      throw new APIError('Unable to delete monitor')
    }
  }
}

module.exports = ProjectRepository
