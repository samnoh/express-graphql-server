import React from 'react';
import styled from 'styled-components';

import NavBar from './NavBar';
import Footer from './Footer';
import Notification from './Notification';
import { media } from 'styles';

const Main = styled.main`
    max-width: 1000px;
    margin: 0 auto;
    padding: 58px 20px 38px;
    min-height: calc(100vh - 138px);

    ${media.tablet`
        padding: 38px 12px;
    `};
`;

const PageTemplate = ({ children }) => {
    return (
        <>
            <NavBar />
            <Notification />
            <Main>{children}</Main>
            <Footer />
        </>
    );
};

export default PageTemplate;
