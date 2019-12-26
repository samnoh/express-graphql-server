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
import { Title, NoItem } from 'styles';
import palette from 'styles/palette';

const Container = styled.section`
    margin: 0 auto;
    border: 1px solid lightgray;
    border-radius: 8px;
    padding: 24px 0;
    background: ${palette.gray[6]};
    color: #fff;
    user-select: none;
    margin-bottom: 60px;
`;

const Information = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 36%;
    margin: 0 auto;
    border-radius: 8px;
`;

const InfoItem = styled.div`
    margin: 20px;
    text-align: center;

    & div {
        color: ${palette.gray[2]};
        font-size: 20px;
        font-weight: bold;
        margin-bottom: 10px;
    }

    font-size: 24px;
`;

const Username = styled.h1`
    font-weight: 300;
    font-size: 42px;
    text-align: center;
    margin-bottom: 30px;
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
    const postsCount = data.postsCount;
    const commentsCount = data.commentsCount;

    return (
        <>
            <Helmet>
                <title>Profile | {username}</title>
            </Helmet>
            <Container>
                <Username>{username}</Username>
                <Information>
                    <InfoItem>
                        <div>Posts</div>
                        {postsCount}
                    </InfoItem>
                    <InfoItem>
                        <div>Comments</div>
                        {commentsCount}
                    </InfoItem>
                </Information>
            </Container>
            <Title>Recent Posts</Title>
            {posts.length ? (
                posts.map(post => <Post key={post.id} {...post} simple />)
            ) : (
                <NoItem>No Post</NoItem>
            )}
            <Title>Recent Comments</Title>
            {comments.length ? (
                comments.map(comment => (
                    <Link to={`/post/${comment.postId}`} key={comment.id}>
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
