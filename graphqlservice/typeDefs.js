const { gql } = require('apollo-server')

const typeDefs = gql`
    type Post {
        id: ID
        userId: Int
        title: String
        body: String
    }

    # type User {
    #     id: ID,
    #     name: String,
    #     username: String,
    #     email: String,
    #     address: {
    #         street: String,
    #         suite: String,
    #         city: String,
    #         zipcode: String,
    #         geo: {
    #             lat: String,
    #             lng: String
    #         }
    #     }
    # }

    type Query {
        getPosts: [Post]
        getPost(id: String): Post
        #users: [User]
    }

    type Mutation {
        createPost(userId: Int, title: String, body: String): Post
        updatePost(id: ID!, userId: Int, title: String, body: String): Post
        deletePost(id: ID!): Post
    }
`
module.exports = typeDefs
