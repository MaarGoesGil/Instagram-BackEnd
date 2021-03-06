const Posts = require('../models/posts')

const postPosts = async (req, res) => {
  const { img, description, atUser, atUsers } = req.body
  try {
    const newPost = await Posts.create({
      img,
      description,
      atUser,
      atUsers
    })
    res.send({
      status: 'success',
      data: newPost
    })
  } catch (err) {
    console.log(err)
  }
}

const getAllPosts = async (req, res) => {
  const { atUser } = req.body
  try {
    const posts = await Posts.find({ atUser })
    posts
      ? res.send(posts)
      : res.status(404).send({
        status: 'error',
        message: 'Posts not found'
      })
  } catch (err) {
    console.log(err)
  }
}

const getPostsId = async (req, res) => {
  const { id } = req.query
  try {
    const post = await Posts.findOne({ _id: id })
    post
      ? res.send(post)
      : res.status(404).send({
        status: 'error',
        message: 'Post not found'
      })
  } catch (err) {
    console.log(err)
  }
}

const patchPosts = async (req, res) => {
  const { id, img, description, atUsers } = req.body
  try {
    await Posts.findOneAndUpdate({ _id: id }, { img, description, atUsers }, { new: true })
    res.send({
      status: 'success',
      data: {
        msg: 'Post updated'
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const deletePosts = async (req, res) => {
  const { id } = req.body
  try {
    await Posts.findByIdAndRemove({ _id: id })
    res.send({
      status: 'success',
      data: {
        msg: 'Post deleted'
      }
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  postPosts,
  getAllPosts,
  getPostsId,
  patchPosts,
  deletePosts
}
