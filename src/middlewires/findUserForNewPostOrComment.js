const Users = require('../models/users')
const bcrypt = require('bcrypt')
const { compareToken } = require('./token')

const findUserForNewPostOrComment = async (req, res, next) => {
  const { token, password, userId } = req.body
  try {
    const user = await Users.findOne({ _id: userId })
    console.log(user)
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
    console.log(err)
    res.status(400).json({
      message: err.message
    })
  }
}

const tokenToUserID = async (req, res, next) => {
  const { token, password } = req.body
  try {
    const userId = await compareToken(token, password)
    req.body.userId = userId
    next()
  } catch (err) {
    console.log(err)
    res.status(400).json({
      message: err.message
    })
  }
}

module.exports = { findUserForNewPostOrComment, tokenToUserID }
