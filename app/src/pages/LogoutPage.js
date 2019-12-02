import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { removeToken } from 'store/actions/auth';
import { showNoti } from 'store/actions/noti';

const LogoutPage = ({ history }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        history.replace('/');
        dispatch(removeToken());
        setTimeout(() => {
            dispatch(showNoti('Logged out sucessfully', 'primary', 3));
        }, 0);
    }, []);

    return null;
};

export default LogoutPage;
