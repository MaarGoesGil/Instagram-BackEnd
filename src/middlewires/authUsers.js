const Comments = require('../models/comments')
const Posts = require('../models/posts')
const Users = require('../models/users')
const { compareToken } = require('./token')
/*
authComments se va a encargar de corroborar que matchee el user con el comment o con el post
*/

module.exports.authComments = async function (req, res, next) {
  const { token, id } = req.body
  try {
    const _idUser = compareToken(token)
    const comment = await Comments.findById({ _id: id })
    const userAdmin = await Users.findOne({ _id: _idUser })
    comment && comment.userId === _idUser
      ? next()
      : comment && comment.userId === userAdmin._id
        ? next()
        : res.status(404).send({
          msg: "You don't have to permission to delete this comment"
        })
  } catch (err) {
    console.log(err)
  }
}

module.exports.authPost = async function (req, res, next) {
  const { token, id } = req.body
  try {
    const _idUser = compareToken(token)
    console.log(_idUser)
    const post = await Posts.findById({ _id: id }).lean()
    const userAdmin = await Users.findOne({ _id: _idUser })
    post.userId === _idUser
      ? next()
      : post.userId === userAdmin._id
        ? next()
        : res.status(404).send({
          msg: "You don't have to permission to delete this post"
        })
  } catch (err) {
    console.log(err)
  }
}
