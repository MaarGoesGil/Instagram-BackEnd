const app = require('./setting/app')

app.listen(process.env.PORT, () => {
  console.log(`Listening at PORT ${process.env.PORT}`)
}
)
