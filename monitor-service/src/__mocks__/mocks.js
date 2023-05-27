jest.mock('redis', () => {
  return {
    createClient: () => {
      return {
        connect: jest.fn(),
        subscribe: jest.fn(),
        publish: jest.fn()
      }
    }
  }
})

jest.mock('ws', () => {
  return {
    WebSocketServer: jest.fn()
  }
})

jest.mock('node-cron', () => ({
  schedule: jest.fn()
}))

jest.mock('../utils', () => {
  return {
    ...jest.requireActual('../utils'),
    publisherRPC: () => Promise.resolve(1)
  }
})
