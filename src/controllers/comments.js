const Comments = require('../models/comments')

const postComments = async (req, res) => {
  const { text, idPost, atUser, userId} = req.body
  try {
    await Comments.create({ text, idPost, atUser, userId })
    res.send({
      status: 'success',
      data: {
        msg: 'Comment created'
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const getAllComments = async (req, res) => {
  const { idPost } = req.query
  try {
    const comments = await Comments.find({ idPost })
    comments
      ? res.send(comments)
      : res.send({
        status: 'error',
        message: 'Comments not found'
      })
  } catch (err) {
    console.log(err)
  }
}

const getCommentsById = async (req, res) => {
  const { id } = req.query
  try {
    const comments = await Comments.findOne({ _id: id })
    comments
      ? res.send(comments)
      : res.send({
        status: 'error',
        message: 'Comments not found'
      })
  } catch (err) {
    console.log(err)
  }
}

const patchComments = async (req, res) => {
  const { text, id } = req.body
  try {
    await Comments.findOneAndUpdate({ _id: id }, { text }, { new: true })
    res.send({
      status: 'success',
      data: {
        msg: 'Comment updated'
      }
    })
  } catch (err) {
    console.log(err)
  }
}

const deleteComments = async (req, res) => {
  const { id } = req.body
  try {
    await Comments.findByIdAndRemove({ _id: id })
    res.send({
      status: 'success',
      data: {
        msg: 'Comment deleted'
      }
    })
  } catch (err) {
    console.log(err)
  }
}

module.exports = {
  postComments,
  getAllComments,
  getCommentsById,
  patchComments,
  deleteComments
}
