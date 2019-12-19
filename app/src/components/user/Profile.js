import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { Link } from 'react-router-dom';

import { GET_USER } from 'graphql/queries';
import Post from 'components/post/Post';
import Comment from 'components/post/Comment';
import ErrorPage from 'pages/ErrorPage';
import LoadingPage from 'pages/LoadingPage';

const Container = styled.section`
    margin: 0 auto;
    border: 1px solid lightgray;
    border-radius: 8px;
    padding: 24px 0;
    background: #4e6e8e;
    color: #fff;
`;

const Username = styled.h1`
    font-weight: 300;
    font-size: 42px;
    text-align: center;
`;

const Title = styled.h2`
    font-size: 26px;
    margin: 100px 0 40px 6px;
    color: #444;
`;

const NoItem = styled.div`
    font-size: 24px;
    padding: 62px 0 120px;
    text-align: center;
    color: #aaa;
    user-select: none;
`;

const Profile = ({ id }) => {
    const { loading, error, data } = useQuery(GET_USER, {
        variables: { id },
        fetchPolicy: 'cache-and-network'
    });

    if (error) return <ErrorPage />;

    if (loading) return <LoadingPage />;

    const { username } = data.user;
    const posts = data.postsByUserId;
    const comments = data.comments;

    return (
        <>
            <Helmet>
                <title>Profile | {username}</title>
            </Helmet>
            <Container>
                <Username>{username}'s Profile</Username>
            </Container>
            <Title>Recent Posts</Title>
            {posts.length ? posts.map(post => <Post {...post} simple />) : <NoItem>No Post</NoItem>}
            <Title>Recent Comments</Title>
            {comments.length ? (
                comments.map(comment => (
                    <Link to={`/post/${comment.postId}`}>
                        <Comment {...comment} user={{ id }} profile />
                    </Link>
                ))
            ) : (
                <NoItem>No Comment</NoItem>
            )}
        </>
    );
};

export default Profile;
