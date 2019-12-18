import { SET_TOKEN, REMOVE_TOKEN } from 'store/actions/auth';

const initialState = {
    token: null,
    userId: null
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TOKEN:
            const { token, userId, username } = action.payload;
            return { ...state, token, userId, username };
        case REMOVE_TOKEN:
            return initialState;
        default:
            return state;
    }
};

export default authReducer;
