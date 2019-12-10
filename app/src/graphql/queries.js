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
    }
    ${fragments.user}
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
