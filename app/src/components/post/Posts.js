import React, { useState, useEffect } from 'react';
import { useLazyQuery } from '@apollo/react-hooks';
import Helmet from 'react-helmet';

import { GET_POSTS } from 'graphql/queries';
import Post from './Post';
import Pagination from './Pagination';
import ErrorPage from 'pages/ErrorPage';
import LoadingPage from 'pages/LoadingPage';

const Posts = ({ page }) => {
    const [numPostOnPage, setNumPostOnPage] = useState(10);
    const [getData, { called, loading, error, data }] = useLazyQuery(GET_POSTS, {
        variables: {
            pagination: { offset: page * numPostOnPage - numPostOnPage, limit: numPostOnPage }
        },
        fetchPolicy: 'no-cache'
    });

    useEffect(() => {
        getData();
    }, []);

    if (error) return <ErrorPage />;

    if (called && loading) return <LoadingPage />;

    if (!called) return <LoadingPage />;

    return (
        <>
            <Helmet>
                <title>Posts ({'' + data.postsCount})</title>
            </Helmet>
            {data.posts.map(post => (
                <Post {...post} key={post.id} />
            ))}
            <Pagination
                currPage={page ? Math.abs(page) : 1}
                total={data.postsCount}
                nPostOnPage={numPostOnPage}
            />
        </>
    );
};

export default Posts;
