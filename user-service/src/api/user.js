
module.exports = (app) => {
  // Sign-in the user
  app.post('/signin', async (req, res, next) => {
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
