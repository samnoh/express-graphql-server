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
        createdAt: String!
        updatedAt: String!
        postId: Int!
        user: User!
    }

    type Post {
        id: Int!
        title: String!
        content: String
        createdAt: String
        user: User
    }

    type Favourite {
        id: Int!
        createdAt: String!
        post: Post
    }

    type Query {
        checkToken: User!
        user(id: Int!): User!
        users(pagination: PaginationInput): [User]!
        post(id: Int!): Post
        posts(option: queryOptionInput, pagination: PaginationInput): [Post]!
        postsCount(id: Int): Int!
        postsByUserId(id: Int, username: String, pagination: PaginationInput): [Post]!
        comments(id: Int!): [Comment]!
        commentsByPostId(id: Int!, pagination: PaginationInput): [Comment]!
        commentsCount(id: Int!): Int!
        favourite(id: Int!): Boolean!
        favourites(id: Int!, pagination: PaginationInput): [Favourite]!
        favouritesCount(id: Int!): Int!
        search(query: String!, content: Boolean, pagination: PaginationInput): [Post]!
    }

    type Mutation {
        signup(user: UserInput!): String!
        login(user: UserInput!): String!
        addPost(title: String!, content: String): Post!
        editPost(id: Int!, title: String!, content: String): Post!
        deletePost(id: Int!): Boolean!
        addComment(id: Int!, content: String!): Boolean!
        editComment(id: Int!, content: String!): Boolean!
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

    input queryOptionInput {
        order: String
    }
`;

export default typeDefs;
