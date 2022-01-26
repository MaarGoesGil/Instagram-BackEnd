const Users = require('../models/users')

const strategyFunction = async (accessToken, refreshToken, profile, cb) => {
  try {
    const user = await Users.exists({ facebookID: profile.id })
    console.log(profile, 'PERFIL de FACEBOOK')
    !user && await Users.create({ facebookID: profile.id, name: profile.displayName })
    cb()
  } catch (err) { console.log(err) }
}

module.exports = strategyFunction
