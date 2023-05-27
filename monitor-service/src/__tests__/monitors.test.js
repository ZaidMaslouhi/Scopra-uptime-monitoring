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
