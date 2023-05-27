const { ProjectRepository } = require('../database/repository')
const { FormateData } = require('../utils')

class ProjectService {
  constructor () {
    this.repository = new ProjectRepository()
  }

  async getProjects (userId) {
    const projects = await this.repository.FindProjects(userId)

    return FormateData({ projects })
  }

  async createProject (project) {
    if (!project) { throw new Error('Project information are not defined!') }

    const newProject = await this.repository.CreateProject(project)

    if (!newProject) throw new Error('Cannot create new project!')

    return FormateData(newProject)
  }

  async updateProject (project) {
    const updatedProject = await this.repository.UpdateProject(project)

    if (!updatedProject) throw new Error('Cannot update project!')

    return FormateData(updatedProject)
  }

  async deleteProject (project) {
    const deletedProject = await this.repository.DeleteProject(project)

    if (!deletedProject) throw new Error('Cannot delete project!')

    return FormateData(deletedProject)
  }
}

module.exports = ProjectService
