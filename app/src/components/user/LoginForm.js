import React, { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import Form from 'components/common/Form';
import { GET_POSTS, LOGIN } from 'graphql/queries';

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

const inputAttrs = [
    {
        label: 'Username',
        type: 'text',
        name: 'username'
    },
    {
        label: 'Password',
        type: 'password',
        name: 'password'
    }
];

const LoginForm = () => {
    // const { loading, error, data: posts, fetchMore } = useQuery(GET_POSTS, {
    //     variables: { pagination: { offset: 0, limit: 5 } },
    //     fetchPolicy: 'cache-and-network'
    // });
    const [loginInputs, setLoginInputs] = useState({ username: '', password: '' });
    const [login, { loading, error: loginError, data: { login: jwt } = {} }] = useMutation(LOGIN);

    const onChange = useCallback(
        e => {
            setLoginInputs({ ...loginInputs, [e.target.name]: e.target.value });
        },
        [loginInputs]
    );

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            login({ variables: { user: loginInputs } });
            setLoginInputs({ username: '', password: '' });
        },
        [loginInputs]
    );

    if (loginError) return <div>Error!</div>;

    return (
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
            <FormContainer>
                <div>
                    <Title>Sign in to S53 Blog</Title>
                    <Form
                        onSubmit={onSubmit}
                        onChange={onChange}
                        inputAttrs={inputAttrs}
                        values={loginInputs}
                        buttonText="Login"
                        loading={loading}
                    />
                    <Message>
                        Not a member? <Link to="#">Sign up now</Link>
                    </Message>
                </div>
            </FormContainer>
        </LoginContainer>
    );
};

export default LoginForm;
