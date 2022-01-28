const Users = require('../models/users')
const bcrypt = require('bcrypt')
const { compareToken } = require('./token')

module.exports.isAdmin = async function (req, res, next) {
  const { token, password } = req.body
  const { id } = compareToken(token)
  try {
    const user = await Users.findOne({ _id: id })
    !user && res.status(404).send({
      status: 'error',
      message: 'User not found'
    })
    await bcrypt.compare(password, user.password) && user.isAdmin
      ? next()
      : res.send({
        status: 'error',
        message: 'Wrong credentials'
      })/*  next() */
  } catch (err) {
    console.log(err)
  }
}
