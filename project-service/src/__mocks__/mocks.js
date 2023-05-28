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
