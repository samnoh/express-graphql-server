import React from 'react';
import Helmet from 'react-helmet';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    flex-direction: column;
    min-height: calc(100vh - 234px);
`;

const PostDetailTemplate = ({ children, title }) => {
    return (
        <Container>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            {children}
        </Container>
    );
};

export default PostDetailTemplate;
