const GoogleStrategy = require('passport-google-oauth2').Strategy
const passport = require('passport')
const {
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
  GOOGLE_CALLBACK_URL
} = require('../envirement')
const { UserModel } = require('../../database/models')

const googlePassportConfig = () => {
  passport.use(
    new GoogleStrategy(
      {
        clientID: GOOGLE_CLIENT_ID,
        clientSecret: GOOGLE_CLIENT_SECRET,
        callbackURL: GOOGLE_CALLBACK_URL
      },
      async function (req, accessToken, refreshToken, profile, done) {
        try {
          let user = await UserModel.findOne({
            email: profile.emails[0].value
          })

          if (!user) {
            user = await UserModel.create({
              username:
                profile.displayName ??
                profile.emails[0].value.slice(0, user.email.indexOf('@')),
              email: profile.emails[0].value,
              source: 'google'
            })
          }

          //   https://saasbase.dev/blog/building-an-authentication-system-using-passport-js-node-js-and-mongodb-part-1-google-login
          //   if (currentUser.source != "google") {
          //     //return error
          //     return done(null, false, {
          //       message: `You have previously signed up with a different signin method`,
          //     });
          //   }

          return done(null, user._id)
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

module.exports = googlePassportConfig
