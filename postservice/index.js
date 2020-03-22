const wiring = require('./wiring')
const PostService = require('./PostService')
wiring(new PostService())
