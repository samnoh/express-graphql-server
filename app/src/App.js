import React, { lazy, Suspense } from 'react';
import { Switch, Route } from 'react-router-dom';

import { GlobalStyle } from 'styles';
import LoadingPage from 'pages/LoadingPage';

const PostsPage = lazy(() => import('pages/PostsPage'));
const PostPage = lazy(() => import('pages/PostPage'));
const EditorPage = lazy(() => import('pages/EditorPage'));
const UserPage = lazy(() => import('pages/UserPage'));
const LoginPage = lazy(() => import('pages/LoginPage'));
const LogoutPage = lazy(() => import('pages/LogoutPage'));
const SignupPage = lazy(() => import('pages/SignupPage'));
const SearchPage = lazy(() => import('pages/SearchPage'));
const FavouritesPage = lazy(() => import('pages/FavouritesPage'));
const NotFoundPage = lazy(() => import('pages/NotFoundPage'));

const App = () => {
    return (
        <>
            <GlobalStyle />
            <Suspense fallback={<LoadingPage />}>
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
                    <Route path="/search" component={SearchPage} />
                    <Route component={NotFoundPage} />
                </Switch>
            </Suspense>
        </>
    );
};

export default App;
