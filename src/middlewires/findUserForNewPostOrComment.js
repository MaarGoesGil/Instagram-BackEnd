const Users = require('../models/users')
const bcrypt = require('bcrypt')
const { compareToken } = require('./token')

const findUserForNewPostOrComment = async (req, res, next) => {
  const { password, userId } = req.body
  try {
    const user = await Users.findOne({ _id: userId })
    if (!user) {
      return res.status(400).json({
        message: 'User not found'
      })
    }
    user && await bcrypt.compare(password, user.password)
      ? next()
      : res.status(400).json({
        message: 'Invalid password'
      })
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}

const tokenToUserID = async (req, res, next) => {
  const { token } = req.body
  try {
    const userId = await compareToken(token)
    const user = await Users.findOne({ _id: userId })
    req.body.userId = userId
    !req.body.atUser && user.atUser
    next()
  } catch (err) {
    res.status(400).json({
      message: err.message
    })
  }
}

module.exports = { findUserForNewPostOrComment, tokenToUserID }
