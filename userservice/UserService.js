const ServiceResolver = require('../sharedLibs/ServiceResolver')
const { v4: uuidv4 } = require('uuid')

const serviceResolver = new ServiceResolver()

class UserService {
    constructor() {
        this.dbName = 'user'
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
            .collection('user')
            .find({}, { limit: args.limit || 10 })
            .toArray((err, users) => {
                if (err) {
                    cb(err)
                    return
                }
                cb(null, {
                    users,
                })
            })
    }

    filter(args, cb) {
        if (!this.db) {
            cb(Error('No database connection'))
            return
        }

        this.db
            .collection('user')
            .find(args, { limit: args.limit || 10 })
            .toArray((err, users) => {
                if (err) {
                    cb(err)
                    return
                }
                cb(null, {
                    users,
                })
            })
    }

    create(args, cb) {
        if (!this.db) {
            cb(Error('No database connection'))
            return
        }

        this.db
            .collection('user')
            .insert({ ...args, id: uuidv4() }, (err, result) => {
                if (err) {
                    cb(err)
                    return
                }
                cb(null, { user: result.ops[0] })
            })
    }

    update({ id, ...data }, cb) {
        if (!this.db) {
            cb(Error('No database connection'))
            return
        }

        this.db
            .collection('user')
            .findOneAndUpdate({ id }, { $set: data }, (err, result) => {
                if (err) {
                    cb(err)
                    return
                }
                cb(null, { user: { ...result.value, ...data } })
            })
    }

    remove({ id }, cb) {
        if (!this.db) {
            cb(Error('No database connection'))
            return
        }

        this.db.collection('user').deleteOne({ id }, (err, result) => {
            if (err) {
                cb(err)
                return
            }
            cb(null, { user: { title: '', body: '' } })
        })
    }
}

module.exports = UserService
