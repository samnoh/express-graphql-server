import React, { useEffect, lazy, Suspense } from 'react';
import { createGlobalStyle } from 'styled-components';
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
        box-sizing: border-box;
    }
    body {
        font-family: 'Roboto', sans-serif;
        min-height: 100vh;
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
                    <Route path="/post/new" component={PostPage} />
                    <Route path="/user/:id" component={UserPage} />
                    <Route path="/user/:id/favourites" component={UserPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </Suspense>
        </>
    );
};

export default App;
