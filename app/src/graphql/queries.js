import { gql } from 'apollo-boost';

export const ADD_POST = gql`
    mutation addPost($title: title, $content: content) {
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

export const GET_POSTS = gql`
    {
        posts {
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
