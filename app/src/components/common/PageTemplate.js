import React from 'react';
import styled from 'styled-components';

import NavBar from './NavBar';
import Footer from './Footer';

const Main = styled.main`
    padding: 28px;
    min-height: calc(100vh - 138px);
`;

const PageTemplate = ({ children }) => {
    return (
        <>
            <NavBar />
            <Main>{children}</Main>
            <Footer />
        </>
    );
};

export default PageTemplate;
