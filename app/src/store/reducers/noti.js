import { SHOW_NOTI, CLOSE_NOTI } from 'store/actions/noti';

const initialState = {
    show: false,
    message: ''
};

const notiReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_NOTI:
            return {
                ...state,
                show: true,
                message: action.payload.message,
                color: action.payload.color
            };
        case CLOSE_NOTI:
            return initialState;
        default:
            return state;
    }
};

export default notiReducer;
