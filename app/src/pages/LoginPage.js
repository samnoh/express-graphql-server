import React from 'react';
import styled from 'styled-components';
import Helmet from 'react-helmet';

import LoginForm from 'components/auth/LoginForm';
import media from 'styles/media';

const LoginContainer = styled.div`
    display: flex;
    height: 100vh;
`;

const LeftSide = styled.div`
    position: relative;
    width: 500px;
    background-image: url('https://images.unsplash.com/photo-1492551557933-34265f7af79e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80');
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
        color: #666;

        a {
            text-decoration: underline;
        }
    }
`;

const LoginPage = () => {
    return (
        <>
            <Helmet>
                <title>Sign in to S53 Blog</title>
            </Helmet>
            <LoginContainer>
                <LeftSide>
                    <span>
                        Shot by{' '}
                        <a
                            href="https://unsplash.com/@stanleydai"
                            target="_blank"
                            rel="noopener noreferrer">
                            @stanleydai
                        </a>
                    </span>
                </LeftSide>
                <LoginForm />
            </LoginContainer>
        </>
    );
};

export default LoginPage;
