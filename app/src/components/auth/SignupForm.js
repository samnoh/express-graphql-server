import React, { useState, useEffect, useCallback } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';

import Form from 'components/common/Form';
import { SIGNUP } from 'graphql/queries';
import { setToken, removeToken } from 'store/actions/auth';
import { showNoti } from 'store/actions/noti';

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

const SignupForm = ({ history }) => {
    const auth = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const [signupInputs, setSignupInputs] = useState({ username: '', password: '', password2: '' });
    const [
        signup,
        { loading: signupLoading, error: signupError, data: { signup: jwt } = {} }
    ] = useMutation(SIGNUP);

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
        if (signupError) {
            dispatch(removeToken());
            dispatch(showNoti(signupError.message, 'danger', 3));
        }
    }, [dispatch, signupError]);

    const onChange = useCallback(
        e => {
            setSignupInputs({ ...signupInputs, [e.target.name]: e.target.value });
        },
        [setSignupInputs, signupInputs]
    );

    const onSubmit = useCallback(
        e => {
            e.preventDefault();
            signup({ variables: { user: signupInputs } });
            setSignupInputs({ username: '', password: '', password2: '' });
            e.target.username.focus();
        },
        [signup, signupInputs]
    );

    return (
        <Form
            onSubmit={onSubmit}
            onChange={onChange}
            inputAttrs={inputAttrs}
            values={signupInputs}
            buttonText="Sign up"
            loading={signupLoading}
        />
    );
};

export default withRouter(SignupForm);
