const mongoose = require('mongoose')
require('dotenv').config()
const { MONGODB_URI } = process.env

/* Data base connection with Mongodb */
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(db => {
    console.log('DB is connected')
  })
  .catch(err => console.log(err))
