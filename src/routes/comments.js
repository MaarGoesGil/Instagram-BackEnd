const { Router } = require('express')
const { authComments } = require('../middlewires/authUsers')
const { postComments, getAllComments, getCommentsById, patchComments, deleteComments } = require('../controllers/comments')
const comments = Router()

comments.post('/create', postComments)
comments.get('/all', getAllComments)
comments.get('/search', getCommentsById)
comments.patch('/edit', authComments, patchComments)
comments.delete('/remove', authComments, deleteComments)

module.exports = comments
