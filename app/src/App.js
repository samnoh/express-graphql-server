import React, { useEffect, lazy, Suspense } from 'react';
import { createGlobalStyle } from 'styled-components';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { Switch, Route, Redirect } from 'react-router-dom';

const PostsPage = lazy(() => import('pages/PostsPage'));
const PostPage = lazy(() => import('pages/PostPage'));
const UserPage = lazy(() => import('pages/UserPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: initial;
    }
    body {
        box-sizing: border-box;
        overflow-y: scroll;
        font-family: 'Roboto', sans-serif;
    }
    a {
        text-decoration: none;
        color: inherit;
    }
`;

const App = () => {
    useEffect(() => {
        // TODO: check if logged in
    }, []);

    return (
        <>
            <GlobalStyle />
            <Suspense fallback={null}>
                <Switch>
                    <Route exact path="/" component={PostsPage} />
                    <Route path="/posts">
                        <Redirect to="/" />
                    </Route>
                    <Route path="/post/:id" component={PostPage} />
                    <Route path="/user/:id" component={UserPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </Suspense>
        </>
    );
};

// const App = () => {
//     const [loginInputs, setLoginInputs] = useState({ username: '', password: '' });
//     const { loading, error, data: posts, fetchMore } = useQuery(GET_POSTS, {
//         variables: { pagination: { offset: 0, limit: 5 } },
//         fetchPolicy: 'cache-and-network'
//     });
//     const [
//         login,
//         { loading: loginLoading, error: loginError, data: { login: jwt } = {} }
//     ] = useMutation(LOGIN);

//     const onChange = useCallback(
//         e => {
//             setLoginInputs({ ...loginInputs, [e.target.name]: e.target.value });
//         },
//         [loginInputs]
//     );

//     const onSubmit = useCallback(
//         e => {
//             e.preventDefault();
//             login({ variables: { user: loginInputs } });
//             setLoginInputs({ username: '', password: '' });
//         },
//         [loginInputs]
//     );

//     if (loginLoading) return <div>Loading...</div>;

//     if (loginError) return <div>Error!</div>;

//     return (
//         <div>
//             {jwt ? (
//                 jwt
//             ) : (
//                 <form onSubmit={onSubmit}>
//                     <input
//                         type="text"
//                         name="username"
//                         value={loginInputs.username}
//                         onChange={onChange}
//                     />
//                     <input
//                         type="password"
//                         name="password"
//                         value={loginInputs.password}
//                         onChange={onChange}
//                     />
//                     <button type="submit">Submit</button>
//                 </form>
//             )}
//         </div>
//     );
// };

export default App;
