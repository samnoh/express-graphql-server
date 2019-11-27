import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type User {
        id: Int!
        username: String!
        role: String!
    }

    type Post {
        id: Int!
        title: String!
        content: String
        user: User
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
