require('../__mocks__/mocks')
const request = require('supertest')
const createServer = require('../express-app')
const MonitorRepository = require('../database/repository/monitor-repository')
const { ACCESS_TOKEN_KEY } = require('../config')
const { GenerateToken } = require('../utils')

const app = createServer()
let jwt = null
const userSession = { user: '123456789' }
const projectPayload = { id: 'FooBar' }
const monitorPayload = {
  id: '123456',
  name: 'monitor 1',
  uri: 'https://www.foo.com',
  projectId: 'FooBar'
}

beforeAll(() => {
  jwt = GenerateToken(userSession, ACCESS_TOKEN_KEY, '1min')
})

describe('GET /:projectId', () => {
  describe('The project ID not defined in the request parameters', () => {
    test('should response with 404 status', async () => {
      const response = await request(app)
        .get('/')
        .set('authorization', `Bearer ${jwt}`)

      expect(response.statusCode).toBe(404)
    })
  })

  describe('No monitors found for the given project ID', () => {
    test('should return empty monitors list with 200 status', async () => {
      const mockFindMonitorsByProjectId = jest
        .spyOn(MonitorRepository.prototype, 'FindMonitorsByProjectId')
        .mockResolvedValue([])

      const response = await request(app)
        .get(`/${projectPayload.id}`)
        .set('authorization', `Bearer ${jwt}`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({ monitors: [] })
      expect(mockFindMonitorsByProjectId).toHaveBeenCalledTimes(1)
      expect(mockFindMonitorsByProjectId).toHaveBeenCalledWith(
        projectPayload.id
      )
    })
  })

  describe('Return monitors list by project ID', () => {
    test('should return list of monitors with 200 status', async () => {
      const monitors = [
        { id: 'monitor 1', ...monitorPayload },
        { id: 'monitor 2', ...monitorPayload }
      ]
      const mockFindMonitorsByProjectId = jest
        .spyOn(MonitorRepository.prototype, 'FindMonitorsByProjectId')
        .mockResolvedValue(monitors)

      const response = await request(app)
        .get(`/${projectPayload.id}`)
        .set('authorization', `Bearer ${jwt}`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({ monitors })
      expect(mockFindMonitorsByProjectId).toHaveBeenCalledTimes(1)
      expect(mockFindMonitorsByProjectId).toHaveBeenCalledWith(
        projectPayload.id
      )
    })
  })
})

describe('POST /', () => {
  describe('Monitor not defined in the request body', () => {
    test('should response with error message and 400 status', async () => {
      const response = await request(app)
        .post('/')
        .set('authorization', `Bearer ${jwt}`)

      expect(response.statusCode).toBe(400)
      expect(response.text).toBe('"Monitor information is required!"')
    })
  })

  describe('Create new monitor', () => {
    test('should create new monitor', async () => {
      const mockCreateNewMonitor = jest
        .spyOn(MonitorRepository.prototype, 'CreateNewMonitor')
        .mockResolvedValue(jest.fn())

      await request(app)
        .post('/')
        .send({ monitor: { ...monitorPayload } })
        .set('authorization', `Bearer ${jwt}`)

      expect(mockCreateNewMonitor).toHaveBeenCalledTimes(1)
      expect(mockCreateNewMonitor).toHaveBeenCalledWith({
        name: monitorPayload.name,
        uri: monitorPayload.uri,
        projectId: monitorPayload.projectId,
        taskId: expect.any(String)
      })
    })

    test('should return the new monitor object with 201 status', async () => {
      jest
        .spyOn(MonitorRepository.prototype, 'CreateNewMonitor')
        .mockResolvedValue({ ...monitorPayload })

      const response = await request(app)
        .post('/')
        .send({ monitor: { ...monitorPayload } })
        .set('authorization', `Bearer ${jwt}`)

      expect(response.statusCode).toBe(201)
      expect(response.body).toEqual({ monitor: { ...monitorPayload } })
    })
  })
})

describe('PUT /', () => {
  describe('Monitor not defined in the request body', () => {
    test('should response with error message and 400 status', async () => {
      const response = await request(app)
        .put('/')
        .set('authorization', `Bearer ${jwt}`)

      expect(response.statusCode).toBe(400)
      expect(response.text).toBe('"Monitor information is required!"')
    })
  })

  describe('Monitor ID not defined in the request body', () => {
    test('should response with error message and 400 status', async () => {
      const response = await request(app)
        .put('/')
        .send({ monitor: {} })
        .set('authorization', `Bearer ${jwt}`)

      expect(response.statusCode).toBe(400)
      expect(response.text).toBe('"Monitor information is required!"')
    })
  })

  describe('Update Monitor successfully', () => {
    test('should response with updated monitor object and 200 status', async () => {
      const mockUpdateMonitor = jest
        .spyOn(MonitorRepository.prototype, 'UpdateMonitor')
        .mockResolvedValue({ ...monitorPayload })

      const response = await request(app)
        .put('/')
        .send({ monitor: { ...monitorPayload } })
        .set('authorization', `Bearer ${jwt}`)

      expect(response.statusCode).toBe(200)
      expect(response.body).toEqual({ monitor: { ...monitorPayload } })
      expect(mockUpdateMonitor).toHaveBeenCalledTimes(1)
      expect(mockUpdateMonitor).toHaveBeenCalledWith({ ...monitorPayload })
    })
  })
})
