import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, useMutation } from '@apollo/react-hooks';
import styled from 'styled-components';
import { withRouter, Link } from 'react-router-dom';

import Form from 'components/common/Form';
import { setToken, removeToken } from 'store/actions/auth';
import { GET_POSTS, LOGIN } from 'graphql/queries';

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

const LoginForm = ({ history }) => {
    // const { loading, error, data: posts, fetchMore } = useQuery(GET_POSTS, {
    //     variables: { pagination: { offset: 0, limit: 5 } },
    //     fetchPolicy: 'cache-and-network'
    // });
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [loginInputs, setLoginInputs] = useState({ username: '', password: '' });
    const [
        login,
        { loading: loginLoading, error: loginError, data: { login: jwt } = {} }
    ] = useMutation(LOGIN);

    useEffect(() => {
        if (auth.token) {
            history.push('/');
        }
    }, []);

    useEffect(() => {
        if (jwt) {
            history.replace('/');
            dispatch(setToken(jwt));
        }
    }, [jwt]);

    useEffect(() => {
        if (loginError) {
            dispatch(removeToken());
        }
    }, [loginError]);

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
            e.target.username.focus();
        },
        [loginInputs]
    );

    return (
        <FormContainer>
            <div>
                <Title>Sign in to S53 Blog</Title>
                <Form
                    onSubmit={onSubmit}
                    onChange={onChange}
                    inputAttrs={inputAttrs}
                    values={loginInputs}
                    buttonText="Login"
                    loading={loginLoading}
                />
                <Message>
                    Not a member? <Link to="/signup">Sign up now</Link>
                </Message>
            </div>
        </FormContainer>
    );
};

export default withRouter(LoginForm);
