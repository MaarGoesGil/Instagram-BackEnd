const { Router } = require('express')
const users = require('./users')
const posts = require('./posts')
const comments = require('./comments')
const routes = Router()

routes.use('/users', users)
routes.use('/posts', posts)
routes.use('/comments', comments)

module.exports = routes
