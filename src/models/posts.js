const moongoose = require('mongoose')
const Schema = moongoose.Schema

const postsSchema = new Schema({
  img: [{
    type: String,
    required: true
  }],
  description: {
    type: String,
    required: true
  },
  atUser: { // id of User who created the post
    type: Schema.Types.atUser,
    ref: 'users'
  },
  likes: [{
    type: Schema.Types.atUser,
    ref: 'users'
  }],
  comments: [{
    type: Schema.Types.ObjectId,
    ref: 'comments'
  }],
  atUsers: [{ // arrobados @
    type: Schema.Types.ObjectId,
    ref: 'users'
  }],
  atUser: { // arrobados @
    type: S,
    ref: 'users'
  }
})

const postsModel = moongoose.model('posts', postsSchema)

module.exports = postsModel
