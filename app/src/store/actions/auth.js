export const SET_TOKEN = 'SET_TOKEN';
export const REMOVE_TOKEN = 'REMOVE_TOKEN';

const setTokenAction = token => ({
    type: SET_TOKEN,
    payload: token
});

export const setToken = newToken => (dispatch, getState) => {
    localStorage.setItem('token', newToken);
    dispatch(setTokenAction(newToken));
};

const removeTokenAction = () => ({
    type: REMOVE_TOKEN
});

export const removeToken = () => (dispatch, getState) => {
    localStorage.removeItem('token');
    dispatch(removeTokenAction());
};
