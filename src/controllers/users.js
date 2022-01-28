const Users = require('../models/users')
const { generateToken } = require('../middlewires/token')
const { v4: uuidv4 } = require('uuid')
const { sendEmailReset, senEmailSignup } = require('../middlewires/sendEmail')
require('dotenv').config()

const postUsers = async (req, res, next) => {
  try {
    const { name, lastName, email, password, avatar, date, description } = req.body
    const exist = await Users.exists({ email }) // trae booleano
    if (exist) {
      return res.send({
        status: 'error',
        message: 'User already exists'
      })
    }
    await Users.create({
      name: name.toLowerCase(),
      lastName: lastName.toLowerCase(),
      email: email,
      password,
      avatar,
      date,
      description: description?.toLowerCase() || null,
      atUser: uuidv4()
    })
    senEmailSignup(email)
    res.send({
      status: 'success',
      data: {
        message: 'User created'
      }
    })
  } catch (err) {
    res.status(404).send(err.message)
  }
}

const getConfirmUser = async (req, res, next) => {
  const { email } = req.query
  try {
    const user = await Users.findOneAndUpdate({ email }, { verified: true }, { new: true })
    if (!user) {
      return res.send({
        status: 'error',
        message: 'User not found'
      })
    }
    res.send({
      status: 'success',
      data: {
        msg: 'User found', user
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const signIn = async (req, res) => {
  const { email } = req.body
  const { _id, username, avatar, description, atUser, password, date } = await Users.findOne({ email })
  console.log(date)
  const token = generateToken(_id)
  res.send({ username, email, avatar, description, atUser, token, password, date: date.toISOString() })
}

const getAllUsers = async (req, res) => {
  try {
    const users = await Users.find()
    res.send({
      status: 'success',
      data: {
        msg: 'Users',
        users
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const getFirstUsers = async (req, res) => {
  try {
    const users = await Users.where({ isAdmin: false }).sort({ name: 1, lastName: 1, atUser: 1 }).limit(5)
    res.send({
      status: 'success',
      data: {
        msg: 'List of the first 5 users',
        users: users.map((e) => { return { _id: e._id, name: e.name, lastName: e.lastName, avatar: e.avatar, atUser: e.atUser } })
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const getUsersByAtUser = async (req, res) => {
  const { id } = req.query
  try {
    const user = await Users.findOne({ _id: id })
    const { name, lastName, avatar, description } = user
    user
      ? res.send({
        status: 'success',
        data: {
          msg: 'User',
          data: { name, lastName, avatar, description }
        }
      })
      : res.send({
        status: 'error',
        message: 'User not found'
      })
  } catch (err) {
    console.log(err)
  }
}

const getUsersByName = async (req, res) => {
  const { name } = req.query
  try {
    const users = await Users.find({
      $or: [
        { name: { $regex: name.toLowerCase(), $options: 'i' } },
        { lastName: { $regex: name.toLowerCase(), $options: 'i' } },
        { atUser: { $regex: name, $options: 'i' } }
      ]
    }, { name: 1, lastName: 1, atUser: 1 })
      .sort({ name: 1, lastName: 1, atUser: 1 })
    const listUsers = users.map((e) => { return { name: e.name, lastName: e.lastName, avatar: e.avatar, atUser: e.atUser } })
    users.length > 0
      ? res.send({
        status: 'success',
        data: {
          msg: 'User',
          data: listUsers
        }
      })
      : res.send({
        status: 'error',
        message: 'User not found'
      })
  } catch (err) {
    console.log(err)
  }
}

const patchUsers = async (req, res) => {
  const { name, lastName, email, avatar, date, description, atUser } = req.body
  try {
    const user = await Users.findOneAndUpdate({ email }, {
      name: name.toLowerCase(),
      lastName: lastName?.toLowerCase(),
      email,
      avatar,
      date,
      description: description?.toLowerCase(),
      atUser
    }, { new: true })
    res.send({
      status: 'success',
      data: {
        msg: 'User updated',
        user: { ...user._doc, date: date.slice(0, 10) }
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const patchAddAdmin = async (req, res) => {
  const { email } = req.body
  try {
    const user = await Users.findOneAndUpdate({ email }, { isAdmin: true }, { new: true })
    res.send({
      status: 'success',
      data: {
        msg: 'User updated',
        user
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const patchUsersPassword = async (req, res) => {
  const { email, password } = req.body
  try {
    const user = await Users.findOneAndUpdate({ email }, { password }, { new: true })
    res.send({
      status: 'success',
      data: {
        msg: 'User updated',
        user
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const patchUsersResetPassword = async (req, res) => {
  const { email } = req.body
  try {
    const user = await Users.findOneAndUpdate({ email }, { password: uuidv4() }, { new: true })
    sendEmailReset(email, user.password)
    res.send({
      status: 'success',
      data: {
        msg: 'User updated, please check your email',
        user
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const deleteUsers = async (req, res) => {
  const { email } = req.body
  try {
    await Users.findOneAndRemove({ email })
    res.send({
      status: 'success',
      data: {
        msg: 'User deleted'
      }
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  postUsers,
  getConfirmUser,
  signIn,
  getAllUsers,
  getFirstUsers,
  getUsersByName,
  getUsersByAtUser,
  patchUsers,
  patchAddAdmin,
  patchUsersPassword,
  patchUsersResetPassword,
  deleteUsers
}
