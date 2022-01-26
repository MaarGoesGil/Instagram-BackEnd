const Comments = require('../models/comments')
const Posts = require('../models/posts')
const jwt = require('jsonwebtoken')
const { compareToken } = require('./token')
const { isAdmin } = require('./isAdmin')
/*
authComments se va a encargar de corroborar que matchee el user con el comment o con el post
*/

module.exports.authComments = async function (req, res, next) {
  const { id } = req.query
  const { token } = req.body
  try {
    const _id = compareToken(token)
    const comment = await Comments.findById({ _id: id })
    comment && comment.userId === _id ? next() : isAdmin(req, res, next)
  } catch (err) {
    console.log(err)
  }
}

module.exports.authPost = async function (req, res, next) {
  const { id } = req.query
  const { token } = req.body
  try {
    const _id = compareToken(token)
    const post = await Posts.findById({ _id: id })
    post.userId === _id
      ? next()
      : isAdmin(req, res, next)
  } catch (err) {
    console.log(err)
  }
}
