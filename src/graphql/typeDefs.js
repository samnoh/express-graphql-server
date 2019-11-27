import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type User {
        id: Int!
        username: String!
        roles: String!
    }

    type Post {
        id: Int!
        title: String!
        content: String
        userId: Int!
    }

    type Query {
        user(id: Int!): User!
        users: [User]!
        post(id: Int!): [Post]!
        posts: [Post]!
    }

    type Mutation {
        signUp(user: UserInput): String!
        login(user: UserInput): String!
        addPost(title: String!, content: String): Int!
        editPost(id: Int!, title: String!, content: String): Post!
        deletePost(id: Int!): Boolean!
    }

    input UserInput {
        username: String!
        password: String!
    }
`;

export default typeDefs;
