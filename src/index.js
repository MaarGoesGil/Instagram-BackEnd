const app = require('./setting/app')
require('dotenv').config()

app.listen(process.env.PORT, () => {
  console.log(`Listening at PORT ${process.env.PORT}`)
}
)
