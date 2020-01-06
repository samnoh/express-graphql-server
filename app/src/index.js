import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/react-hooks';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';

import store from 'store';
import App from 'App';
import client from 'graphql/client';
import { setToken } from 'store/actions/auth';
import * as serviceWorker from 'serviceWorker';

const checkLogin = () => {
    try {
        const token = localStorage.getItem('token');
        if (!token) return;

        store.dispatch(setToken(token));
    } catch (e) {
        console.error('localStorage is not working...');
    }
};

checkLogin();

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
            <ApolloProvider client={client}>
                <App />
            </ApolloProvider>
        </BrowserRouter>
    </Provider>,
    document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.register();
