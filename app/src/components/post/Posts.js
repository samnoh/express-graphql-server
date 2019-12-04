import React, { useEffect } from 'react';
import { useQuery } from '@apollo/react-hooks';
import qs from 'qs';
import { withRouter } from 'react-router-dom';
import Helmet from 'react-helmet';

import { GET_POSTS } from 'graphql/queries';
import Post from './Post';
import Pagination from './Pagination';

const NumPostOnPage = 10;

const Posts = ({ location, history }) => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });

    const { loading, error, data } = useQuery(GET_POSTS, {
        variables: {
            pagination: { offset: query.page * NumPostOnPage - NumPostOnPage, limit: NumPostOnPage }
        }
    });

    if (error) return <div>Error!</div>;

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <Helmet>
                <title>Posts ({String(data.postsCount)})</title>
            </Helmet>
            {data.posts.map(post => (
                <Post {...post} key={post.id} />
            ))}
            <Pagination
                currPage={query.page ? Math.abs(query.page) : 1}
                total={data.postsCount}
                nPostOnPage={NumPostOnPage}
            />
        </>
    );
};

export default withRouter(Posts);
