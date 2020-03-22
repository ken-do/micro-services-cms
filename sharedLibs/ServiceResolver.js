const { dns } = require('concordant')()
const RestClient = require('./RestClient')
const { MongoClient } = require('mongodb')

class ServiceResolver {
    constructor() {
        this.domains = {
            post: '_main._tcp.postservice.micro.svc.cluster.local',
            user: '_main._tcp.userservice.micro.svc.cluster.local',
            auth: '_main._tcp.authservice.micro.svc.cluster.local',
            mongo: '_main._tcp.mongo.micro.svc.cluster.local',
        }
        this.clients = {}
    }

    getRestClient(service) {
        return new Promise((resolve, reject) => {
            if (this.clients[service] !== undefined) {
                resolve(this.clients[service])
            } else {
                dns.resolve(this.domains[service], (err, locs) => {
                    if (err) {
                        reject(err)
                        return
                    }
                    const { host, port } = locs[0]
                    this.clients[service] = new RestClient({
                        baseUrl: `http://${host}:${port}`,
                    })
                    resolve(this.clients[service])
                })
            }
        })
    }

    getMongoClient() {
        return new Promise((resolve, reject) => {
            if (this.clients.mongo !== undefined) {
                resolve(this.clients.mongo)
            }

            dns.resolve(this.domains.mongo, (err, locs) => {
                if (err) {
                    next(err)
                    return
                }

                const { host, port } = locs[0]
                const url = `mongodb://${host}:${port}`
                const client = new MongoClient(url)
                client.connect(err => {
                    if (err) {
                        cb(err)
                        return
                    }
                    this.clients.mongo = client
                    resolve(this.clients.mongo)
                })
            })
        })
    }
}

module.exports = ServiceResolver
