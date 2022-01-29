const moongoose = require('mongoose')
const Schema = moongoose.Schema

const usersSchema = new Schema({
  name: { // Abril
    type: String,
    required: true
  },
  lastName: { // Gil
    type: String,
    required: true
  },
  email: { // abril@developer.backend
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  avatar: { // img
    type: String
  },
  atUser: { // @MaarGoesgilFSD
    type: String,
    required: true,
    unique: true
  },
  date: { // Birthday
    type: Date,
    required: true
  },
  description: { // About me
    type: String,
    required: false,
    maxLength: 100
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false
  },
  facebookId: { //
    type: String,
    required: false,
    default: null
  },
  verified: { //
    type: Boolean,
    required: true,
    default: false
  }
})

const usersModel = moongoose.model('users', usersSchema)

module.exports = usersModel
