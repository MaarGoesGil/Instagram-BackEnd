const { Router } = require('express')
const { hashPass } = require('../utils/hashPass')
const { comparePass } = require('../utils/comparePass')
const { isAdmin } = require('../middlewires/isAdmin')
const { postUsers, getConfirmUser, signIn, getAllUsers, getUserByAtUser, getUsersByName, patchUsers, patchAddAdmin, patchUsersPassword, patchUsersResetPassword, deleteUsers, getFirstUsers } = require('../controllers/users')
const passport = require('passport')
const users = Router()

users.post('/signup', hashPass, postUsers)
users.get('/confirm', getConfirmUser)
users.get('/signin', comparePass, signIn)
users.get('/all', isAdmin, getAllUsers)
users.get('/first', getFirstUsers)
users.get('/search', getUsersByName)
users.get('/user', getUserByAtUser)
users.patch('/edit', comparePass, patchUsers)
users.patch('/edit-pass', comparePass, (req, res, next) => {
  req.body.password = req.body.newPassword
  next()
}, hashPass, patchUsersPassword)
users.patch('/reset-pass', patchUsersResetPassword)
users.patch('/addadmin', isAdmin, patchAddAdmin)
users.delete('/remove', comparePass, deleteUsers)

// Login with Facebook - not working yet
/* users.get('/auth/facebook', passport.authenticate('facebook'))
users.get('/auth/facebook/callback', passport.authenticate('facebook', {
  successRedirect: '/',
  failureRedirect: '/login'
}))
users.post('/logout', function(req, res){
  req.logout();
  res.redirect('/');
}); */

module.exports = users
