const mongoose = require('mongoose')
require('dotenv').config()

/* Data base connection with Mongodb */
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(db => {
    console.log('DB is connected')
  })
  .catch(err => console.log(err))
