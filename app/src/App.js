import React, { useCallback, useState } from 'react';
import { useQuery, useMutation } from '@apollo/react-hooks';

import { GET_POSTS, LOGIN, ADD_POST } from 'graphql/queries';

const App = () => {
    const [loginInputs, setLoginInputs] = useState({ username: '', password: '' });
    const { loading, error, data: posts } = useQuery(GET_POSTS);
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
        <div>
            {jwt ? (
                jwt
            ) : (
                <form onSubmit={onSubmit}>
                    <input
                        type="text"
                        name="username"
                        value={loginInputs.username}
                        onChange={onChange}
                    />
                    <input
                        type="password"
                        name="password"
                        value={loginInputs.password}
                        onChange={onChange}
                    />
                    <button type="submit">Submit</button>
                </form>
            )}
        </div>
    );
};

export default App;
