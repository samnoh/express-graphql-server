import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';

import Form from 'components/common/Form';
import { setToken, removeToken } from 'store/actions/auth';
import { showNoti } from 'store/actions/noti';
import { LOGIN } from 'graphql/queries';

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
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [loginInputs, setLoginInputs] = useState({ username: '', password: '' });
    const [
        login,
        { loading: loginLoading, error: loginError, data: { login: jwt } = {} }
    ] = useMutation(LOGIN);

    useEffect(() => {
        if (auth.token) {
            history.replace('/');
        }
    }, [auth, history]);

    useEffect(() => {
        if (jwt) {
            history.replace('/');
            dispatch(setToken(jwt));
        }
    }, [dispatch, history, jwt]);

    useEffect(() => {
        if (loginError) {
            dispatch(removeToken());
            dispatch(showNoti(loginError.message, 'danger', 3));
        }
    }, [dispatch, loginError]);

    const onChange = useCallback(
        e => {
            setLoginInputs({ ...loginInputs, [e.target.name]: e.target.value });
        },
        [setLoginInputs, loginInputs]
    );

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            login({ variables: { user: loginInputs } });
            setLoginInputs({ password: '' });
            e.target.password.focus();
        },
        [login, loginInputs]
    );

    return (
        <Form
            onSubmit={onSubmit}
            onChange={onChange}
            inputAttrs={inputAttrs}
            values={loginInputs}
            buttonText="Sign in"
            loading={loginLoading}
        />
    );
};

export default withRouter(LoginForm);