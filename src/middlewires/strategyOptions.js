require('dotenv').config()

const strategyOptions = {
  clientID: process.env.CLIENT_ID,
  clientSecret: process.env.CLIENT_SECRET,
  callbackURL: process.env.CALLBACK_URL,
  scope: ['profile', 'email']
}

module.exports = strategyOptions
