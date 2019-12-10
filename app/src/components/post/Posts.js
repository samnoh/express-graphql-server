import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import Helmet from 'react-helmet';

import { GET_POSTS } from 'graphql/queries';
import Post from './Post';
import Pagination from './Pagination';

const Posts = ({ page }) => {
    const [numPostOnPage, setNumPostOnPage] = useState(10);
    const { loading, error, data } = useQuery(GET_POSTS, {
        variables: {
            pagination: { offset: page * numPostOnPage - numPostOnPage, limit: numPostOnPage }
        }
    });

    if (error) return <div>Error!</div>;

    if (loading) return <div>Loading...</div>;

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
