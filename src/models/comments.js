const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CommentsSchema = new Schema({
  atUser: { // @AbrilDeveloper
    type: String,
    required: true
  },
  idPost: { // id of Post
    type: Schema.Types.ObjectId,
    ref: 'posts'
  },
  text: {
    type: String,
    required: false,
    maxLength: 255
  },
  userId: { // id of User who created the comment
    type: Schema.Types.ObjectId,
    ref: 'users'
  }
})

const commentsModel = mongoose.model('comments', CommentsSchema)
module.exports = commentsModel
