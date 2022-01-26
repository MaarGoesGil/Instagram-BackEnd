const { Router } = require('express')
const { hashPass } = require('../utils/hashPass')
const { comparePass } = require('../utils/comparePass')
const { isAdmin } = require('../middlewires/isAdmin')
const { postUsers, getConfirmUser, signIn, getAllUsers, getUsersById, getUsersByName, patchUsers, patchUsersPassword, patchUsersResetPassword, deleteUsers, getFirstUsers } = require('../controllers/users')
const passport = require('passport')
const users = Router()

users.post('/signup', hashPass, postUsers)
users.get('/confirm', getConfirmUser)
users.get('/signin', comparePass, signIn)
users.get('/all', isAdmin, getAllUsers)
users.get('/first', getFirstUsers)
users.get('/search', getUsersByName)
users.get('/user', getUsersById)
users.patch('/edit', comparePass, patchUsers)
users.patch('/edit-pass', comparePass, patchUsersPassword)
users.patch('/reset-pass', patchUsersResetPassword)
users.delete('/remove', comparePass, deleteUsers)
users.get('/auth/facebook',
  passport.authenticate('facebook'))

users.get('/auth/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }))

module.exports = users
