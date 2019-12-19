import React, { lazy, Suspense } from 'react';
import { createGlobalStyle } from 'styled-components';
import { Switch, Route } from 'react-router-dom';

const PostsPage = lazy(() => import('pages/PostsPage'));
const PostPage = lazy(() => import('pages/PostPage'));
const EditorPage = lazy(() => import('pages/EditorPage'));
const UserPage = lazy(() => import('pages/UserPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const LogoutPage = lazy(() => import('pages/LogoutPage'));
const SignupPage = lazy(() => import('pages/SignupPage'));
const FavouritesPage = lazy(() => import('pages/FavouritesPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));

const GlobalStyle = createGlobalStyle`
    * {
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    body {
        font-family: 'Roboto', sans-serif;
    }

    a {
        text-decoration: none;
        color: inherit;
    }
`;

const App = () => {
    return (
        <>
            <GlobalStyle />
            <Suspense fallback={null}>
                <Switch>
                    <Route exact path="/" component={PostsPage} />
                    <Route path="/post/new" component={EditorPage} />
                    <Route path="/post/:id/edit" component={EditorPage} />
                    <Route path="/post/:id" component={PostPage} />
                    <Route path="/user/:id/favourites" component={FavouritesPage} />
                    <Route path="/user/:id" component={UserPage} />
                    <Route path="/login" component={LoginPage} />
                    <Route path="/logout" component={LogoutPage} />
                    <Route path="/signup" component={SignupPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </Suspense>
        </>
    );
};

export default App;
