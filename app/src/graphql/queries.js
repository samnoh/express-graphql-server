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
            createdAt
        }
    `,
    comment: gql`
        fragment commentFragment on Comment {
            id
            content
            createdAt
            updatedAt
            postId
            user {
                id
                username
            }
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

// Profile
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
        postsCount(id: $id)
        commentsCount(id: $id)
    }
    ${fragments.user}
    ${fragments.post}
    ${fragments.comment}
`;

export const GET_POSTS = gql`
    query posts($option: queryOptionInput, $pagination: PaginationInput) {
        posts(option: $option, pagination: $pagination) {
            ...postFragment
        }
        postsCount
    }
    ${fragments.post}
`;

export const GET_POSTS_BY_USER_ID = gql`
    query postsByUserId($username: String!, $pagination: PaginationInput) {
        postsByUserId(username: $username, pagination: $pagination) {
            ...postFragment
        }
    }
    ${fragments.post}
`;

export const GET_POST = gql`
    query post($id: Int!) {
        post(id: $id) {
            ...postFragment
        }
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

export const GET_COMMENT = gql`
    query commentsByPostId($id: Int!, $pagination: PaginationInput) {
        commentsByPostId(id: $id, pagination: $pagination) {
            ...commentFragment
        }
    }
    ${fragments.comment}
`;

export const ADD_COMMENT = gql`
    mutation addComment($id: Int!, $content: String!) {
        addComment(id: $id, content: $content)
    }
`;

export const EDIT_COMMENT = gql`
    mutation editComment($id: Int!, $content: String!) {
        editComment(id: $id, content: $content)
    }
`;

export const DELETE_COMMENT = gql`
    mutation deleteComment($id: Int!) {
        deleteComment(id: $id)
    }
`;

export const GET_FAVOURITE = gql`
    query favourite($id: Int!) {
        favourite(id: $id)
    }
`;

export const GET_FAVOURITES = gql`
    query favourites($id: Int!, $pagination: PaginationInput) {
        favourites(id: $id, pagination: $pagination) {
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

export const SEARCH_POST = gql`
    query search($query: String!, $content: Boolean, $pagination: PaginationInput) {
        search(query: $query, content: $content, pagination: $pagination) {
            id
            title
            createdAt
            user {
                id
                username
            }
        }
    }
`;
