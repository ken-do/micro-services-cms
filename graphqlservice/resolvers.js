const resolvers = {
    Query: {
        posts: async (parent, args, { serviceResolver }) => {
            try {
                const client = await serviceResolver.getRestClient('post')
                const { data } = await client.get('/posts')
                return data.posts
            } catch (err) {
                console.log(err)
                return null
            }
        },
    },
    Mutation: {
        createPost: async (_, args, { serviceResolver }) => {
            try {
                const client = await serviceResolver.getRestClient('post')
                const { data } = await client.post('/posts', args)
                return data.post
            } catch (err) {
                console.log(err)
                return null
            }
        },
    },
}

module.exports = resolvers
