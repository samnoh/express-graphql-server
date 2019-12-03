import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import { GET_POST } from 'graphql/queries';

const PostDetailContainer = styled.section``;

const Title = styled.h2``;

const Description = styled.p``;

const PostDetail = ({ location }) => {
    const postId = parseInt(location.pathname.split('/')[2]);
    console.log(postId);
    const { loading, error, data } = useQuery(GET_POST, {
        variables: { id: 1 }
    });

    if (error) return <div>Error!</div>;

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <Helmet>
                <title>1</title>
            </Helmet>
            <PostDetailContainer>
                <Title></Title>
                <Description></Description>
            </PostDetailContainer>
        </>
    );
};

export default withRouter(PostDetail);
