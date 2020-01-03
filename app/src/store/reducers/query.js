import { SET_POSTS_FILTER } from 'store/actions/query';

const initialState = {
    postsFilter: 'newest'
};

const queryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_POSTS_FILTER:
            return {
                ...state,
                postsFilter: action.payload
            };
        default:
            return state;
    }
};

export default queryReducer;
