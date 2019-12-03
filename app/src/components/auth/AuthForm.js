import React, { useState, useCallback, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';

import Form from 'components/common/Form';
import { setToken, removeToken } from 'store/actions/auth';
import { showNoti } from 'store/actions/noti';
import { LOGIN, SIGNUP } from 'graphql/queries';

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
    },
    {
        label: 'Confirm Password',
        type: 'password',
        name: 'password2'
    }
];

const AuthForm = ({ history, signup }) => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [values, setValues] = useState({ username: '', password: '', password2: '' });
    const [fn, { loading, error, data: { [signup ? 'signup' : 'login']: jwt } = {} }] = useMutation(
        signup ? SIGNUP : LOGIN
    );

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
        if (error) {
            dispatch(removeToken());
            dispatch(showNoti(error.message, 'danger', 3));
        }
    }, [dispatch, error]);

    const onChange = useCallback(
        e => {
            setValues({ ...values, [e.target.name]: e.target.value });
        },
        [setValues, values]
    );

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            fn({ variables: { user: values } });
            console.log(values);
            setValues({ password: '', password2: '' });
            e.target.password.focus();
        },
        [fn, values]
    );

    return (
        <Form
            onSubmit={onSubmit}
            onChange={onChange}
            inputAttrs={inputAttrs.slice(0, signup ? 3 : 2)}
            values={values}
            buttonText={signup ? 'Sign Up' : 'Sign in'}
            loading={loading}
        />
    );
};

export default withRouter(AuthForm);
