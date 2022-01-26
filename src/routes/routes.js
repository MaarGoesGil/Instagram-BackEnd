const { Router } = require('express')
const users = require('./users')
const posts = require('./posts')
const comments = require('./comments')
const { politic } = require('../controllers/politic.js')
const routes = Router()

routes.use('/users', users)
routes.use('/posts', posts)
routes.use('/comments', comments)
routes.use('/politic', politic)

module.exports = routes
