const { Router } = require('express')
const { authPost } = require('../middlewires/authUsers')
const { findUserForNewPostOrComment, tokenToUserID } = require('../middlewires/findUserForNewPostOrComment')
const { postPosts, getAllMyPosts, getAllPosts, getPostsId, patchPosts, deletePosts } = require('../controllers/posts')
const posts = Router()

posts.post('/create', tokenToUserID, findUserForNewPostOrComment, postPosts)
posts.get('/myposts', tokenToUserID, getAllMyPosts)
posts.get('/search', getPostsId)
posts.get('/all', tokenToUserID, getAllPosts)
posts.patch('/edit', authPost, patchPosts)
posts.delete('/remove', authPost, deletePosts)

module.exports = posts
