const Users = require('../models/users')
const bcrypt = require('bcrypt')
const { isAdmin } = require('../middlewires/isAdmin')
/*
Auth se va a encargar de corroborar el user.
*/
module.exports.comparePass = async function (req, res, next) {
  const { email, password } = req.body
  try {
    const user = await Users.findOne({ email })
    !user && res.send({
      status: 'success',
      message: 'User not found',
      user
    })

    !user.verified &&
      res.send({
        status: 'error',
        message: 'You need to verify your email'
      })

    user.verified && await bcrypt.compare(password, user.password)
      ? next()
      : isAdmin(req, res, next)
  } catch (err) {
    console.log(err)
  }
}
