import { SHOW_NOTI, CLOSE_NOTI } from 'store/actions/noti';

const initialState = {
    show: false,
    message: ''
};

const notiReducer = (state = initialState, action) => {
    switch (action.type) {
        case SHOW_NOTI:
            const { message, color, background } = action.payload;
            return {
                ...state,
                show: true,
                message,
                color,
                background
            };
        case CLOSE_NOTI:
            return initialState;
        default:
            return state;
    }
};

export default notiReducer;
