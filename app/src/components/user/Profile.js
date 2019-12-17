import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import { GET_USER } from 'graphql/queries';
import Post from 'components/post/Post';
import ErrorPage from 'pages/ErrorPage';
import LoadingPage from 'pages/LoadingPage';

const Container = styled.section`
    margin: 0 auto;
    border: 1px solid lightgray;
    border-radius: 8px;
    padding: 16px;
    background: #4e6e8e;
    color: #fff;
`;

const Username = styled.h1`
    font-weight: 300;
    font-size: 42px;
    text-align: center;
`;

const RecentPosts = styled.h2`
    font-size: 26px;
    margin: 40px 0;
    color: #333;
`;

const Profile = ({ id }) => {
    const { loading, error, data } = useQuery(GET_USER, {
        variables: { id }
    });

    if (error) return <ErrorPage />;

    if (loading) return <LoadingPage />;

    const { username } = data.user;
    const posts = data.postsByUserId;

    return (
        <>
            <Helmet>
                <title>{username}</title>
            </Helmet>
            <Container>
                <Username>{username}'s Profile</Username>
            </Container>
            <RecentPosts>Recent Posts</RecentPosts>
            {posts.map(post => (
                <Post {...post} simple />
            ))}
        </>
    );
};

export default Profile;
