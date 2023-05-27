const { UserService } = require('../services')
const UserAuth = require('./middlewares/auth')
const {
  ACCESS_TOKEN_KEY,
  REFRESH_TOKEN_KEY
} = require('../config')
const {
  GenerateToken,
  ValidateToken,
  SetCookie,
  ClearCookie
} = require('../utils')
const {
  NotFoundError,
  ForbiddenError
} = require('../utils/error-handler/app-errors')
const passport = require('passport')

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
    try {
      const { user } = req.body

      const { newUser, refreshToken } = await service.createUser(user)

      SetCookie(res, 'jwt', refreshToken)

      return res.status(201).json({ user: newUser })
    } catch (error) {
      next(error)
    }
  })

  // Refresh Token
  app.get('/refresh', async (req, res, next) => {
    try {
      const cookies = req.cookies
      if (!cookies?.jwt) throw new NotFoundError('Refresh Token not found!')

      const refreshToken = cookies.jwt

      const isAuthorized = ValidateToken(req, refreshToken, REFRESH_TOKEN_KEY)
      if (!isAuthorized) throw new ForbiddenError('Unvalid Refresh Token!')

      const user = await service.findUserByToken(refreshToken)

      const accessToken = GenerateToken(
        { user: user._id },
        ACCESS_TOKEN_KEY,
        '30min'
      )

      res.status(201).json({ ...user, token: accessToken })
    } catch (error) {
      next(error)
    }
  })

  // Update user info
  app.put('/account', UserAuth, async (req, res, next) => {
    try {
      const { user } = req.body

      const updatedUser = await service.updateUser(user)

      return res.status(201).json({ user: updatedUser })
    } catch (error) {
      next(error)
    }
  })

  // Logout user
  app.get('/logout', UserAuth, async (req, res, next) => {
    try {
      const cookies = req.cookies
      if (!cookies?.jwt) return res.sendStatus(200)

      const user = await service.findUserByToken(cookies.jwt)

      if (user) {
        await service.updateUserToken({ id: user._id, token: '' })
      }

      ClearCookie(res, 'jwt')

      res.status(200).json({ message: 'User logged off!' })
    } catch (error) {
      next(error)
    }
  })

  // Google auth
  app.get(
    '/auth/google',
    passport.authenticate('google', { scope: ['profile', 'email'] })
  )
  app.get(
    '/auth/google/callback',
    passport.authenticate('google', { failureRedirect: '/signin' }),
    async (req, res, next) => {
      try {
        const userId = req.user.toString()

        const { refreshToken, accessToken } = service.passportAuth(userId)

        SetCookie(res, 'jwt', refreshToken)

        res.status(201).json({ accessToken })
      } catch (error) {
        next(error)
      }
    }
  )

  // GitHub auth
  app.get(
    '/auth/github',
    passport.authenticate('github', { scope: ['user:email'] })
  )
  app.get(
    '/auth/github/callback',
    passport.authenticate('github', { failureRedirect: '/signin' }),
    async (req, res, next) => {
      try {
        // Redirect or return JWT token
        const userId = req.user.toString()

        const { refreshToken, accessToken } = service.passportAuth(userId)

        SetCookie(res, 'jwt', refreshToken)

        res.status(201).json({ accessToken })
      } catch (error) {
        next(error)
      }
    }
  )
}
