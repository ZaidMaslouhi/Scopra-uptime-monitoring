const UserAuth = require('./middlewares/auth')

module.exports = (app) => {
  // Get user's projects
  app.get('/', UserAuth, async (req, res, next) => {
  })

  // Add new project
  app.post('/', UserAuth, async (req, res, next) => {
  })

  // Update project
  app.put('/', UserAuth, async (req, res, next) => {
  })

  // Delete project
  app.delete('/:id', UserAuth, async (req, res, next) => {
  })
}
