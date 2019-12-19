import { gql } from 'apollo-server-express';

const typeDefs = gql`
    type User {
        id: Int!
        username: String!
        role: String
    }

    type Comment {
        id: Int!
        content: String!
        user: User!
        createdAt: String!
        updatedAt: String!
        postId: Int
    }

    type Post {
        id: Int!
        title: String!
        content: String
        createdAt: String!
        user: User
        comment: [Comment]
    }

    type Query {
        checkToken: User!
        user(id: Int!): User!
        users(pagination: PaginationInput): [User]
        post(id: Int!): Post
        posts(pagination: PaginationInput): [Post]
        postsCount: Int!
        postsByUserId(id: Int!, pagination: PaginationInput): [Post]
        comments(id: Int!): [Comment]
        favourite(id: Int!): Boolean!
        favourites(id: Int!): [Post]
    }

    type Mutation {
        signup(user: UserInput!): String!
        login(user: UserInput!): String!
        addPost(title: String!, content: String): Post!
        editPost(id: Int!, title: String!, content: String): Post!
        deletePost(id: Int!): Boolean!
        addComment(id: Int!, content: String!): Comment!
        editComment(id: Int!, content: String!): Comment!
        deleteComment(id: Int!): Boolean!
        addFavourite(id: Int!): Boolean!
        deleteFavourite(id: Int!): Boolean!
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
