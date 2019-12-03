import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type User {
        id: Int!
        username: String!
        role: String
    }

    type Post {
        id: Int!
        title: String!
        content: String
        createdAt: String!
        user: User!
    }

    type Query {
        checkToken: User!
        user(id: Int!): User!
        users(pagination: PaginationInput): [User]
        post(id: Int!): Post
        posts(pagination: PaginationInput): [Post]
        postsByUserId(id: Int!, pagination: PaginationInput): [Post]!
    }

    type Mutation {
        signup(user: UserInput!): String!
        login(user: UserInput!): String!
        addPost(title: String!, content: String): Int!
        editPost(id: Int!, title: String!, content: String): Post!
        deletePost(id: Int!): Boolean!
    }

    input UserInput {
        username: String!
        password: String!
        password2: String
    }

    input PaginationInput {
        offset: Int
        limit: Int
    }
`;

export default typeDefs;
