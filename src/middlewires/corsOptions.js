module.exports.Admin = {
  origin: 'http://localhost:3002/f/admin/',
  credentials: 'true',
  headers: 'Origin, X-Requested-With, Content-Type, Accept',
  methods: 'GET, POST, OPTIONS, PUT, DELETE, PATCH'
}
module.exports.AllServ = {
  origin: '*',
  credentials: 'true',
  headers: 'Origin, X-Requested-With, Content-Type, Accept',
  methods: 'GET'
}
