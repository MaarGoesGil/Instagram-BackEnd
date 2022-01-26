require('dotenv').config()

const sessionOptions = {
  secret: 'keyfrompasswordsession',
  resave: true,
  saveUninitialized: true
}

module.exports = { sessionOptions }
