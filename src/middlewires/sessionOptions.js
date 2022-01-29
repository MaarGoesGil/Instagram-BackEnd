require('dotenv').config()

const sessionOptions = {
  resave: false,
  saveUninitialized: true,
  secret: process.env.SECRET_KEY,
  cookie: { maxAge: 3600000 * 24 }
}

module.exports = { sessionOptions }
