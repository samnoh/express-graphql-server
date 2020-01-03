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

const passwordRegExp = new RegExp(
    '^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[.#?!@$%^&*-+]).{8,}$'
);

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
            setValues(values => ({ ...values, password: '', password2: '' }));
        }
    }, [dispatch, error, setValues]);

    const onChange = useCallback(
        e => {
            setValues({ ...values, [e.target.name]: e.target.value });
        },
        [setValues, values]
    );

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            e.target.password.focus();

            // if signin page and password is valid
            if (!signup || passwordRegExp.test(values.password)) {
                fn({ variables: { user: values } });
                return;
            }

            dispatch(
                showNoti(
                    'Password should contain at least one upper case, lower case, one digit and one special character (.#?!@$%^&*-+)',
                    'danger',
                    6
                )
            );
            setValues(values => ({ ...values, password: '', password2: '' }));
        },
        [fn, values, dispatch, signup]
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
