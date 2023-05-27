const { UserService } = require('../services')
const { SetCookie } = require('../utils')

module.exports = (app) => {
  const service = new UserService()

  // Sign-in the user
  app.post('/signin', async (req, res, next) => {
    try {
      const { user } = req.body

      const loggedUser = await service.loginUser({ user })

      SetCookie(res, 'jwt', loggedUser.refreshToken)

      res.status(201).json({ user: loggedUser.user })
    } catch (error) {
      next(error)
    }
  })

  // Sign-up new user
  app.post('/signup', async (req, res, next) => {
  })

  // Update user info
  app.put('/account', async (req, res, next) => {
  })

  // Logout user
  app.get('/logout', async (req, res, next) => {
  })

  // Refresh Token
  app.get('/refresh', async (req, res, next) => {
  })
}
