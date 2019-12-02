import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import Notification from 'components/common/Notification';
import media from 'styles/media';

const LoginContainer = styled.div`
    display: flex;
    height: 100vh;
`;

const LeftSide = styled.div`
    position: relative;
    width: 500px;
    background-image: url(${props => props.imageUrl});
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;

    ${props => {}}

    ${media.tablet`
        display: none;
    `};

    & span {
        position: absolute;
        bottom: 15px;
        left: 25px;
        color: #666;

        a {
            text-decoration: underline;
        }
    }
`;

const FormContainer = styled.div`
    padding: 50px;
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
`;

const Title = styled.h2`
    font-weight: 600;
    font-size: 26px;
    margin-bottom: 25px;
    color: #444;
`;

const Message = styled.div`
    font-size: 15px;
    top: 25px;
    right: 25px;
    position: absolute;
    color: #444;
    text-align: right;

    & a {
        color: #4295f7;
    }
`;

const AuthTemplate = ({ children, title, message, image: { imageUrl, authorUrl, author } }) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Notification />
            <LoginContainer>
                <LeftSide imageUrl={imageUrl}>
                    <span>
                        Shot by{' '}
                        <a href={authorUrl} target="_blank" rel="noopener noreferrer">
                            {author}
                        </a>
                    </span>
                </LeftSide>
                <FormContainer>
                    <div>
                        <Title>{title}</Title>
                        {children}
                        <Message>{message}</Message>
                    </div>
                </FormContainer>
            </LoginContainer>
        </>
    );
};

export default AuthTemplate;
