import React, { useState } from 'react';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';

import NavBar from 'components/common/NavBar';
import media from 'styles/media';

const PageContainer = styled.div`
    overflow: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: calc(100vh - 81px);
    text-align: center;
    ${media.mobile`
        height: calc(100vh - 69px);
    `};
    h1 {
        font-weight: 400;
        font-size: 40px;
        margin-bottom: 30px;
        ${media.tablet`
            font-size: 28px;
        `};
    }
    img {
        width: 500px;
        margin-bottom: 35px;
        transition: all 0.3s ease-in;
        @media (hover: hover) {
            &:hover {
                filter: blur(2px);
            }
        }
        ${media.tablet`
            width: 280px;
        `};
    }
`;

const NotFoundPage = () => {
    return (
        <>
            <Helmet>
                <title>404 — Page Not Found</title>
            </Helmet>
            <NavBar />
            <PageContainer>
                <h1>Page Not Found</h1>
                <img src="/404.png" alt="Page Not Found" />
            </PageContainer>
        </>
    );
};

export default NotFoundPage;
