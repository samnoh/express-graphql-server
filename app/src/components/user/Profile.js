import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import { GET_USER } from 'graphql/queries';
import Post from 'components/post/Post';

const Container = styled.section`
    width: 600px;
    height: 300px;
    margin: 0 auto;
    border: 1px solid lightgray;
    border-radius: 8px;
    padding: 12px;
`;

const Username = styled.h1`
    font-weight: 300;
    font-size: 42px;
    text-align: center;
`;

const Profile = ({ id }) => {
    const { loading, error, data } = useQuery(GET_USER, {
        variables: { id }
    });

    if (error) return <div>Error!</div>;

    if (loading) return <div>Loading...</div>;

    const { username } = data.user;
    const posts = data.postsByUserId;

    return (
        <>
            <Helmet>
                <title>{username}</title>
            </Helmet>
            <Container>
                <Username>{username}</Username>
            </Container>
            <h2>Recent Posts</h2>
            {posts.map(post => (
                <Post {...post} simple />
            ))}
        </>
    );
};

export default Profile;
