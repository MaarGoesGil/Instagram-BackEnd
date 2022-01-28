/* Modules */
const express = require('express')
const session = require('express-session')
const morgan = require('morgan')
const cors = require('cors')
const passport = require('passport')
const { errorHandler } = require('../middlewires/handleErrors')
const { isAdmin } = require('../middlewires/isAdmin')
const routes = require('../routes/routes')
const { newStrategy } = require('../middlewires/newStrategy')
const { sessionOptions } = require('../middlewires/sessionOptions')
const { Admin, AllServ } = require('../middlewires/corsOptions.js')
require('./db')
require('dotenv').config()
const app = express()

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
app.use(session(sessionOptions))
app.use(passport.initialize())
app.use(passport.session())
passport.use(newStrategy)

/* Routes */
app.use('/', routes)
// app.use('/api/v1', routes)

/* Errors */
app.use(errorHandler)

module.exports = app
