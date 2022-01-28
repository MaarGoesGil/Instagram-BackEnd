const jwt = require('jsonwebtoken')
/*
Token se va a encargar de generar un codigo de id
para el usuario cada vez que inicie sesion.
Asi el front lo almacena en el localStorage || sessionStorage
*/
const Token = {
  generateToken: (id) => {
    try {
      const token = jwt.sign({
        id
      }, process.env.JWT_SECRET)
      return token
    } catch (err) {
      console.log(err)
    }
  },
  compareToken: (token) => {
    try {
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      return decoded.id
    } catch (err) {
      return err
    }
  }
}
module.exports = Token
