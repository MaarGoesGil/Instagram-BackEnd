const bcrypt = require('bcrypt')

// Creacion de usuario
module.exports.hashPass = async (req, res, next) => {
  const { password } = req.body
  req.body.password = await bcrypt.hash(password, 10)
  next()
}
