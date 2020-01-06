import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import Helmet from 'react-helmet';
import { Redirect } from 'react-router-dom';

import { setPostsFilter } from 'store/actions/query';
import { GET_POSTS } from 'graphql/queries';
import Post from './Post';
import Pagination from './Pagination';
import ErrorPage from 'pages/ErrorPage';
import LoadingPage from 'pages/LoadingPage';
import Dropdown from 'components/common/Dropdown';
import { Title, NoItem } from 'styles';
import { capitalize } from 'utils';

const DropdownMenu = ['newest', 'oldest'];

const Posts = ({ page }) => {
    const [numPostOnPage] = useState(10);
    const { postsFilter } = useSelector(state => state.query);
    const { loading, error, data } = useQuery(GET_POSTS, {
        variables: {
            option: { order: postsFilter },
            pagination: { offset: page * numPostOnPage - numPostOnPage, limit: numPostOnPage }
        },
        fetchPolicy: 'cache-and-network'
    });

    if (error) return <ErrorPage />;

    if (loading) return <LoadingPage />;

    return (
        <>
            <Helmet>
                <title>Posts</title>
            </Helmet>
            <Dropdown
                title={
                    <Title style={{ display: 'inline-block', marginBottom: '0' }}>{`${capitalize(
                        postsFilter
                    )} Posts`}</Title>
                }
                list={DropdownMenu}
                action={setPostsFilter}
                value={postsFilter}
            />
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
