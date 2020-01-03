import { palette } from 'styles';

export const SHOW_NOTI = 'SHOW_NOTI';
export const CLOSE_NOTI = 'CLOSE_NOTI';

const timers = [];

const getColor = theme => {
    switch (theme) {
        case 'primary':
            return { background: palette.blue[6], color: palette.gray[1] };
        case 'danger':
            return { background: palette.red[6], color: palette.gray[1] };
        default:
            return theme;
    }
};

export const closeNoti = () => ({
    type: CLOSE_NOTI
});

const showNotiAction = (message, background, color) => ({
    type: SHOW_NOTI,
    payload: { message, background, color }
});

export const showNoti = (message, theme, sec) => (dispatch, getState) => {
    const closeTimers = () => {
        timers.forEach(t => clearTimeout(t));
        timers.length = 0;
        dispatch(closeNoti());

        return new Promise((resolve, reject) => {
            return resolve();
        });
    };

    const { background, color } = getColor(theme);

    closeTimers().then(() => {
        dispatch(
            showNotiAction(
                message.includes('error:') ? message.split(':')[1] : message,
                background,
                color
            )
        );

        const timer = setTimeout(() => {
            dispatch(closeNoti());
        }, sec * 1000);

        timers.push(timer);
    });
};
