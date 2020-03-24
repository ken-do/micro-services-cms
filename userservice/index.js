const wiring = require('./wiring')
const UserService = require('./UserService')
wiring(new UserService())
