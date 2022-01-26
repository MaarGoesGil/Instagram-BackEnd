/* Modules */
const express = require('express')
const session = require('express-session')
const morgan = require('morgan')
const passport = require('passport')
const cors = require('cors')
const FacebookStrategy = require('passport-facebook').Strategy
const { errorHandler } = require('../middlewires/handleErrors')
require('../middlewires/corsAdmin.js')
const sessionOptions = require('../middlewires/session.js')
const strategyFunction = require('../middlewires/strategyFunction.js')
require('./db')
const routes = require('../routes/routes')
const app = express()
require('dotenv').config()
const Users = require('../models/users')

// cors options for cross origin
/*
const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200
}
*/

/* Middlewares */
app.use(express.json())
app.use(morgan('dev'))
app.use(cors())
app.use(session({
  resave: false,
  saveUninitialized: true,
  secret: 'process.env.secret',
  cookie: { maxAge: 3600000 * 24 }
}))
app.use(passport.initialize())
app.use(passport.session())
passport.use(new FacebookStrategy({
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL
},
async function (accessToken, refreshToken, profile, cb) {
  try {
    console.log(profile)
    const user = await Users.exists({ facebookId: profile.id })
    if (!user) {
      const newUser = await Users.create({ facebookId: profile.id })
      return cb(null, newUser)
    }
    const userFacebook = Users.findOne({ facebookId: profile.id })
    cb(null, userFacebook)
  } catch (err) {
    cb(err, null)
  }
}
))

/* Routes */
app.use('/', /* admin, */ routes)
// app.use('/api/v1', cors(corsOptions), routes)

/* Errors */
app.use(errorHandler)

module.exports = app
