const ServiceResolver = require('../sharedLibs/ServiceResolver')
const { v4: uuidv4 } = require('uuid')

const serviceResolver = new ServiceResolver()

class PostService {
    constructor() {
        this.dbName = 'post'
        this.setup()
    }

    async setup() {
        try {
            const mongoClient = await serviceResolver.getMongoClient()
            this.client = mongoClient
            this.db = mongoClient.db(this.dbName)
        } catch (e) {
            console.log(e)
            return null
        }
    }

    list(args, cb) {
        if (!this.db) {
            cb(Error('No database connection'))
            return
        }

        this.db
            .collection('post')
            .find({}, { limit: args.limit || 10 })
            .toArray((err, posts) => {
                if (err) {
                    cb(err)
                    return
                }
                cb(null, {
                    posts,
                })
            })
    }

    filter(args, cb) {
        if (!this.db) {
            cb(Error('No database connection'))
            return
        }

        this.db
            .collection('post')
            .find(args, { limit: args.limit || 10 })
            .toArray((err, posts) => {
                if (err) {
                    cb(err)
                    return
                }
                cb(null, {
                    posts,
                })
            })
    }

    create(args, cb) {
        if (!this.db) {
            cb(Error('No database connection'))
            return
        }

        this.db
            .collection('post')
            .insert({ ...args, id: uuidv4() }, (err, result) => {
                if (err) {
                    cb(err)
                    return
                }
                cb(null, { post: result.ops[0] })
            })
    }

    update({ id, ...data }, cb) {
        if (!this.db) {
            cb(Error('No database connection'))
            return
        }

        this.db
            .collection('post')
            .findOneAndUpdate({ id }, { $set: data }, (err, result) => {
                if (err) {
                    cb(err)
                    return
                }
                cb(null, { post: { ...result.value, ...data } })
            })
    }

    remove({ id }, cb) {
        if (!this.db) {
            cb(Error('No database connection'))
            return
        }

        this.db.collection('post').deleteOne({ id }, (err, result) => {
            if (err) {
                cb(err)
                return
            }
            cb(null, { post: { title: '', body: '' } })
        })
    }
}

module.exports = PostService
