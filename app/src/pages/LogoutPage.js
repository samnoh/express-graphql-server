import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { removeToken } from 'store/actions/auth';
import { showNoti } from 'store/actions/noti';

const LogoutPage = ({ history }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        history.replace('/login');
        dispatch(removeToken());
        dispatch(showNoti('Logged out sucessfully', '#4295f7', 3));
    }, []);

    return null;
};

export default LogoutPage;
