import React from 'react';
import styled from 'styled-components';

import NavBar from './NavBar';
import Footer from './Footer';
import Notification from './Notification';

const Main = styled.main`
    padding: 58px 0 90px;
    width: 1000px;
    margin: 0 auto;
    min-height: calc(100vh - 138px);
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
