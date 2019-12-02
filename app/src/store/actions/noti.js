export const SHOW_NOTI = 'SHOW_NOTI';
export const CLOSE_NOTI = 'CLOSE_NOTI';

const timers = [];

export const closeNoti = () => ({
    type: CLOSE_NOTI
});

const showNotiAction = (message, color) => ({
    type: SHOW_NOTI,
    payload: { message, color }
});

export const showNoti = (message, color, sec) => (dispatch, getState) => {
    const closeTimers = () => {
        timers.forEach(t => clearTimeout(t));
        timers.length = 0;
        dispatch(closeNoti());

        return new Promise((resolve, reject) => {
            return resolve();
        });
    };

    closeTimers().then(() => {
        dispatch(
            showNotiAction(
                message.includes('GraphQL error:') ? message.split(':')[1] : message,
                color
            )
        );

        const timer = setTimeout(() => {
            dispatch(closeNoti());
        }, sec * 1000);

        timers.push(timer);
    });
};
