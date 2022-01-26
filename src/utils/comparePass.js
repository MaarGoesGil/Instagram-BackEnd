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
    user && await bcrypt.compare(user.password, password)
      ? next()
      : isAdmin(req, res, next)
  } catch (err) {
    console.log(err)
  }
}
