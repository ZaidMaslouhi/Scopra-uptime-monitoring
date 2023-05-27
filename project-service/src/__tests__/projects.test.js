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

describe('POST /', () => {
  describe('Project does not defined on the request body', () => {
    test('should return error message with 400 status', async () => {
      const response = await request(app)
        .post('/')
        .send({})
        .set('authorization', `Bearer ${jwt}`)

      expect(response.statusCode).toBe(400)
      expect(response.text).toEqual('"Project is required!"')
    })
  })

  describe("Can't create new project", () => {
    test('should return error message with 500 status', async () => {
      const mockCreateProject = jest
        .spyOn(ProjectRepository.prototype, 'CreateProject')
        .mockResolvedValue(null)

      const response = await request(app)
        .post('/')
        .send({ project: { ...projectPayload } })
        .set('authorization', `Bearer ${jwt}`)

      expect(response.statusCode).toBe(500)
      expect(response.text).toEqual('"Cannot create new project!"')
      expect(mockCreateProject).toHaveBeenCalledTimes(1)
      expect(mockCreateProject).toHaveBeenCalledWith({
        ...projectPayload,
        userId: expect.any(String)
      })
    })
  })

  describe('Create new project successfully', () => {
    test('should return created poject object with 201 status', async () => {
      jest
        .spyOn(ProjectRepository.prototype, 'CreateProject')
        .mockResolvedValue({ ...projectPayload })

      const response = await request(app)
        .post('/')
        .send({ project: { ...projectPayload } })
        .set('authorization', `Bearer ${jwt}`)

      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual({ project: { ...projectPayload } })
    })
  })
})
