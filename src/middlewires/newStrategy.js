const FacebookStrategy = require('passport-facebook').Strategy
require('dotenv').config()
const Users = require('../models/users')

const newStrategy = new FacebookStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
function (accessToken, refreshToken, profile, cb) {
  process.nextTick(() => {
    console.log(profile)
    Users.findOne({ facebookId: profile.id }, function (err, user) {
      if (err) {
        return cb(err)
      }
      if (!user) {
        try {
          let name = profile.displayName.split(' ')[0]
          let lastName = profile.displayName.split(' ')[1]
          let email = profile.emails[0].value
          let date = profile?.birthday || new Date()
          let description = profile?.about || `I am a new user, my name is ${profile.displayName}`
          const newUser = Users.create({ facebookId: profile.id, name, lastName, email, date, description, verified: true })
          return cb(null, newUser)
        } catch (err) {
          return cb(err)
        }
      }
      const userExists = Users.findOne({ facebookId: profile.id})
      return cb(null, userExists)
    })
  })
})

module.exports = { newStrategy }
