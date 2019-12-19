import { gql } from 'apollo-boost';

const fragments = {
    post: gql`
        fragment postFragment on Post {
            id
            title
            content
            createdAt
            user {
                id
                username
            }
        }
    `,
    user: gql`
        fragment userFragment on User {
            id
            username
        }
    `,
    comment: gql`
        fragment commentFragment on Comment {
            id
            content
            createdAt
            postId
        }
    `
};

export const LOGIN = gql`
    mutation login($user: UserInput!) {
        login(user: $user)
    }
`;

export const SIGNUP = gql`
    mutation signup($user: UserInput!) {
        signup(user: $user)
    }
`;

export const GET_USER = gql`
    query user($id: Int!) {
        user(id: $id) {
            ...userFragment
        }
        postsByUserId(id: $id) {
            ...postFragment
        }
        comments(id: $id) {
            ...commentFragment
        }
    }
    ${fragments.user}
    ${fragments.post}
    ${fragments.comment}
`;

export const GET_POSTS = gql`
    query posts($pagination: PaginationInput) {
        posts(pagination: $pagination) {
            ...postFragment
        }
        postsCount
    }
    ${fragments.post}
`;

export const GET_POST = gql`
    query post($id: Int!) {
        post(id: $id) {
            ...postFragment
            comment {
                id
                content
                createdAt
                updatedAt
                user {
                    id
                    username
                }
            }
        }
        favourite(id: $id)
    }
    ${fragments.post}
`;

export const ADD_POST = gql`
    mutation addPost($title: String!, $content: String) {
        addPost(title: $title, content: $content) {
            ...postFragment
        }
    }
    ${fragments.post}
`;

export const EDIT_POST = gql`
    mutation editPost($id: Int!, $title: String!, $content: String) {
        editPost(id: $id, title: $title, content: $content) {
            ...postFragment
        }
    }
    ${fragments.post}
`;

export const DELETE_POST = gql`
    mutation deletePost($id: Int!) {
        deletePost(id: $id)
    }
`;

export const ADD_COMMENT = gql`
    mutation addComment($id: Int!, $content: String!) {
        addComment(id: $id, content: $content) {
            id
            content
        }
    }
`;

export const EDIT_COMMENT = gql`
    mutation editComment($id: Int!, $content: String!) {
        editComment(id: $id, content: $content) {
            id
            content
        }
    }
`;

export const DELETE_COMMENT = gql`
    mutation deleteComment($id: Int!) {
        deleteComment(id: $id)
    }
`;

export const GET_FAVOURITES = gql`
    query favourites($id: Int!) {
        favourites(id: $id) {
            id
            createdAt
            post {
                id
                title
                createdAt
            }
        }
        favouritesCount(id: $id)
    }
`;

export const ADD_FAVOURITE = gql`
    mutation addFavourite($id: Int!) {
        addFavourite(id: $id)
    }
`;

export const DELETE_FAVOURITE = gql`
    mutation deleteFavourite($id: Int!) {
        deleteFavourite(id: $id)
    }
`;
