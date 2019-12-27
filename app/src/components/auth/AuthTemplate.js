import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import Notification from 'components/common/Notification';
import media from 'styles/media';
import palette from 'styles/palette';
import { Title } from 'styles';

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

    ${media.tablet`
        display: none;
    `};

    & span {
        position: absolute;
        bottom: 15px;
        left: 25px;
        color: ${palette.gray[6]};

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

const Message = styled.div`
    font-size: 15px;
    top: 25px;
    right: 25px;
    position: absolute;
    color: ${palette.gray[7]};
    text-align: right;

    & a {
        color: ${palette.blue[5]};
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
