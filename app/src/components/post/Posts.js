import React, { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import { GET_POSTS } from 'graphql/queries';
import Post from './Post';

const PostsContainer = styled.div``;

const Posts = () => {
    const [offset, setOffset] = useState(0);
    const { loading, error, data } = useQuery(GET_POSTS, {
        variables: { pagination: { offset, limit: 15 } }
    });

    if (error) return <div>Error!</div>;

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <Helmet>
                <title>Posts ({String(data.posts.length)})</title>
            </Helmet>
            <PostsContainer>
                {data.posts.map(post => (
                    <Post {...post} key={post.id} />
                ))}
            </PostsContainer>
        </>
    );
};

export default Posts;
