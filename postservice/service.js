const ServiceResolver = require('../sharedLibs/ServiceResolver')
const { v4: uuidv4 } = require('uuid')

const serviceResolver = new ServiceResolver()

function service() {
    let db
    setup()

    async function setup() {
        try {
            const client = await serviceResolver.getMongoClient('post')
            db = client
        } catch (e) {
            console.log(e)
        }
    }

    function create(data, cb) {
        if (!db) {
            cb(Error('No database connection'))
            return
        }

        const post = db.collection('post')

        post.insert({ ...data, id: uuidv4() }, (err, result) => {
            if (err) {
                cb(err)
                return
            }

            cb(null, { post: result.ops[0] })
        })
    }

    function list(args, cb) {
        if (!db) {
            cb(Error('No database connection'))
            return
        }

        const post = db.collection('post')
        post.find({}, { limit: 10 }).toArray((err, docs) => {
            if (err) {
                cb(err)
                return
            }
            cb(null, {
                posts: docs,
            })
        })
    }

    return { create, list }
}

module.exports = service
