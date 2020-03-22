const resolvers = {
    Query: {
        getPosts: async (parent, args, { serviceResolver }) => {
            try {
                const client = await serviceResolver.getRestClient('post')

                const { data } = await client.get('/posts')

                return data.posts
            } catch (err) {
                console.log('ERR', err)
                return null
            }
        },
        getPost: async (parent, { id }, { serviceResolver }) => {
            try {
                const client = await serviceResolver.getRestClient('post')

                const { data } = await client.get(`/posts/${id}`)

                return data.post
            } catch (err) {
                console.log('ERR', err)
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
        updatePost: async (_, { id, ...args }, { serviceResolver }) => {
            try {
                const client = await serviceResolver.getRestClient('post')
                const { data } = await client.patch(`/posts/${id}`, args)
                return data.post
            } catch (err) {
                console.log(err)
                return null
            }
        },
        deletePost: async (_, { id, ...args }, { serviceResolver }) => {
            try {
                const client = await serviceResolver.getRestClient('post')
                const { data } = await client.remove(`/posts/${id}`)
                return data.post
            } catch (err) {
                console.log(err)
                return null
            }
        },
    },
}

module.exports = resolvers
