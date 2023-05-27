require('../__mocks__/mocks')
const request = require('supertest')
const createServer = require('../express-app')
const ProjectRepository = require('../database/repository/project-repository')
const { ACCESS_TOKEN_KEY } = require('../config')
const { GenerateToken } = require('../utils')

const app = createServer()
let jwt = null
const userSession = { user: '123456789' }
const projectPayload = { id: '987654321', name: 'Foo' }

beforeAll(() => {
  jwt = GenerateToken(userSession, ACCESS_TOKEN_KEY, '1min')
})

describe('GET /', () => {
  describe('User does not have any project yet', () => {
    test('should return empty object with 200 status', async () => {
      const mockFindProjects = jest
        .spyOn(ProjectRepository.prototype, 'FindProjects')
        .mockResolvedValue({})

      const response = await request(app)
        .get('/')
        .set('authorization', `Bearer ${jwt}`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({ projects: {} })
      expect(mockFindProjects).toHaveBeenCalledTimes(1)
      expect(mockFindProjects).toHaveBeenCalledWith(userSession.user)
    })
  })

  describe('User have projects', () => {
    test('should return list of projects with 200 status', async () => {
      const projects = [
        { id: 'Project 1', ...projectPayload },
        { id: 'Project 2', ...projectPayload }
      ]
      const mockFindProjects = jest
        .spyOn(ProjectRepository.prototype, 'FindProjects')
        .mockResolvedValue(projects)

      const response = await request(app)
        .get('/')
        .set('authorization', `Bearer ${jwt}`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({ projects })
      expect(mockFindProjects).toHaveBeenCalledTimes(1)
      expect(mockFindProjects).toHaveBeenCalledWith(userSession.user)
    })
  })
})
