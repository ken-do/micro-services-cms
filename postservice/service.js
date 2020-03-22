const ServiceResolver = require('../sharedLibs/ServiceResolver')
const { v4: uuidv4 } = require('uuid')

const serviceResolver = new ServiceResolver()

function service() {
    let client
    const dbName = 'post'
    setup()

    async function setup() {
        try {
            const mongoClient = await serviceResolver.getMongoClient()
            client = mongoClient
        } catch (e) {
            console.log(e)
        }
    }

    function create(data, cb) {
        if (!client) {
            cb(Error('No database connection'))
            return
        }

        client.connect(err => {
            if (err) {
                cb(err)
                return
            }
            const db = client.db(dbName)
            db.collection('post').insert(
                { ...data, id: uuidv4() },
                (err, result) => {
                    if (err) {
                        cb(err)
                        return
                    }
                    client.close()
                    cb(null, { post: result.ops[0] })
                },
            )
        })
    }

    function list(args, cb) {
        if (!client) {
            cb(Error('No database connection'))
            return
        }

        client.connect(err => {
            if (err) {
                cb(err)
                return
            }
            const db = client.db(dbName)
            db.collection('post')
                .find({}, { limit: 10 })
                .toArray((err, posts) => {
                    if (err) {
                        cb(err)
                        return
                    }
                    client.close()
                    cb(null, {
                        posts,
                    })
                })
        })
    }

    return { create, list }
}

module.exports = service
