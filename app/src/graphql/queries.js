import { gql } from 'apollo-boost';

export const ADD_POST = gql`
    mutation addPost($title: title!, $content: content) {
        addPost(title: $title, content: $content) {
            id
        }
    }
`;

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

export const GET_POSTS = gql`
    query Posts($pagination: PaginationInput) {
        posts(pagination: $pagination) {
            id
            title
            content
            user {
                id
                username
            }
        }
    }
`;
