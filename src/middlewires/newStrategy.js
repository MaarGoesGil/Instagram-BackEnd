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
          const newUser = Users.create({ facebookId: profile.id, name: 'facebook' })
          return cb(null, newUser)
        } catch (err) {
          return cb(err)
        }
      }
      return cb(null, user)
    })
  })
})

module.exports = { newStrategy }
