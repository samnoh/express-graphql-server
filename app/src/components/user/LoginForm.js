import React, { useState, useCallback } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';

import Form from 'components/common/Form';
import { GET_POSTS, LOGIN } from 'graphql/queries';

const FormContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
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
    const [loginInputs, setLoginInputs] = useState({ username: '', password: '' });
    const { loading, error, data: posts, fetchMore } = useQuery(GET_POSTS, {
        variables: { pagination: { offset: 0, limit: 5 } },
        fetchPolicy: 'cache-and-network'
    });
    const [
        login,
        { loading: loginLoading, error: loginError, data: { login: jwt } = {} }
    ] = useMutation(LOGIN);

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

    if (loginLoading) return <div>Loading...</div>;

    if (loginError) return <div>Error!</div>;

    return (
        <FormContainer>
            {jwt ? (
                jwt
            ) : (
                <Form
                    onSubmit={onSubmit}
                    onChange={onChange}
                    inputAttrs={inputAttrs}
                    values={loginInputs}
                    buttonText="Login"
                />
            )}
        </FormContainer>
    );
};

export default LoginForm;
