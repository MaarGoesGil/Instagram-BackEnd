const { Router } = require('express')
const { authPost } = require('../middlewires/authUsers')
const { postPosts, getAllPosts, getPostsId, patchPosts, deletePosts } = require('../controllers/posts')
const posts = Router()

posts.post('/create', postPosts)
posts.get('/all', getAllPosts)
posts.get('/search', getPostsId)
posts.patch('/edit', authPost, patchPosts)
posts.delete('/remove', authPost, deletePosts)

module.exports = posts
