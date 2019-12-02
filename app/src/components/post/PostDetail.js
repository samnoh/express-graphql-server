import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import PageTemplate from 'components/common/PageTemplate';

const PostDetailContainer = styled.section``;

const PostDetail = () => {
    return (
        <>
            <Helmet>
                <title>title here</title>
            </Helmet>
            <PostDetailContainer>Post Detail</PostDetailContainer>
        </>
    );
};

export default PostDetail;
