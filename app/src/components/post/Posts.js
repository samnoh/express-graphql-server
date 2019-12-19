import React, { useState, useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Helmet from 'react-helmet';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import { GET_POSTS } from 'graphql/queries';
import Post from './Post';
import Pagination from './Pagination';
import ErrorPage from 'pages/ErrorPage';
import LoadingPage from 'pages/LoadingPage';

const NoItem = styled.div`
    font-size: 24px;
    padding: 62px 0 120px;
    text-align: center;
    color: #aaa;
    user-select: none;
`;

const Posts = ({ page }) => {
    const [numPostOnPage, setNumPostOnPage] = useState(10);
    const { loading, error, data } = useQuery(GET_POSTS, {
        variables: {
            pagination: { offset: page * numPostOnPage - numPostOnPage, limit: numPostOnPage }
        },
        fetchPolicy: 'cache-and-network'
    });

    if (error) return <ErrorPage />;

    if (loading) return <LoadingPage />;

    return (
        <>
            <Helmet>
                <title>Posts ({'' + data.postsCount})</title>
            </Helmet>
            {data.posts.map(post => (
                <Post {...post} key={post.id} />
            ))}
            {data.postsCount && !data.posts.length ? (
                <Redirect to={`?page=${Math.ceil(data.postsCount / numPostOnPage)}`} />
            ) : (
                <Pagination
                    currPage={page ? Math.abs(page) : 1}
                    total={data.postsCount}
                    nPostOnPage={numPostOnPage}
                />
            )}
            {!data.postsCount && <NoItem>No Post</NoItem>}
        </>
    );
};

export default Posts;
