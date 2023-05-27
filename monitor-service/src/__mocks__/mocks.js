
jest.mock('node-cron', () => ({
  schedule: jest.fn()
}))
