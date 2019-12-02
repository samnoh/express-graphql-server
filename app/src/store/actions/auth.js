import jwt from 'jsonwebtoken';

export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

const setTokenAction = (token, userId) => ({
    type: SET_TOKEN,
    payload: { token, userId }
});

export const setToken = token => (dispatch, getState) => {
    localStorage.setItem('token', token);
    const decodedJwt = jwt.decode(token);
    dispatch(setTokenAction(token, decodedJwt.userId));
};

const removeTokenAction = () => ({
    type: REMOVE_TOKEN
});

export const removeToken = () => (dispatch, getState) => {
    localStorage.removeItem('token');
    dispatch(removeTokenAction());
};
