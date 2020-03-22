const restify = require('restify')
const restifyBodyParser = require('restify-plugins').bodyParser
const corsMiddleware = require('restify-cors-middleware')

const cors = corsMiddleware({
    origins: ['*'],
})

const { POSTSERVICE_SERVICE_PORT } = process.env

function wiring(service) {
    const server = restify.createServer()

    server.use(restifyBodyParser())
    server.pre(cors.preflight)
    server.use(cors.actual)

    server.get('/posts', (req, res, next) => {
        service.list(req.params, (err, result) => {
            if (err) {
                res.send(err)
                return
            }
            res.send(200, result)
            next()
        })
    })

    server.get('/posts/:id', (req, res, next) => {
        service.filter({ id: req.params.id }, (err, result) => {
            if (err) {
                res.send(err)
                return
            }
            res.send(200, { post: result.posts[0] })
            next()
        })
    })

    server.post('/posts', (req, res, next) => {
        service.create(req.body, (err, result) => {
            if (err) {
                res.send(err)
                return
            }
            res.send(result)
            next()
        })
    })

    server.patch('/posts/:id', (req, res, next) => {
        service.update({ id: req.params.id, ...req.body }, (err, result) => {
            if (err) {
                res.send(err)
                return
            }
            res.send(200, result)
            next()
        })
    })

    server.del('/posts/:id', (req, res, next) => {
        service.remove({ id: req.params.id }, (err, result) => {
            if (err) {
                res.send(err)
                return
            }
            res.send(200, result)
            next()
        })
    })

    server.listen(POSTSERVICE_SERVICE_PORT, '0.0.0.0', () => {
        console.log(`${server.name} listening at ${server.url}`)
    })
}

module.exports = wiring
