const GitHubStrategy = require('passport-github2').Strategy
const passport = require('passport')
const {
  GITHUB_CLIENT_ID,
  GITHUB_CLIENT_SECRET,
  GITHUB_CALLBACK_URL
} = require('../envirement')
const { UserModel } = require('../../database/models')

const githubPassportConfig = () => {
  passport.use(
    new GitHubStrategy(
      {
        clientID: GITHUB_CLIENT_ID,
        clientSecret: GITHUB_CLIENT_SECRET,
        callbackURL: GITHUB_CALLBACK_URL
      },
      async function (req, accessToken, refreshToken, profile, done) {
        try {
          let user = await UserModel.findOne({
            email: profile.username
          }).exec()

          if (!user) {
            user = await UserModel.create({
              username: profile.username,
              email: profile.username,
              source: 'github'
            })
          }
          //   https://saasbase.dev/blog/building-an-authentication-system-using-passport-js-node-js-and-mongodb-part-1-google-login
          // return done(null, false, {
          //   message: `You have previously signed up with a different signin method`,
          // });
          console.log(user)
          return done(null, user)
        } catch (err) {
          return done(err)
        }
      }
    )
  )

  passport.serializeUser((user, done) => {
    done(null, user)
  })

  passport.deserializeUser((user, done) => {
    done(null, user)
  })
}

module.exports = githubPassportConfig
