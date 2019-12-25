import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { removeToken } from 'store/actions/auth';
import { showNoti } from 'store/actions/noti';

const LogoutPage = ({ history }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        history.replace('/', { notiOnNextPage: true });
        dispatch(removeToken());
        dispatch(showNoti('Logged out sucessfully', 'primary', 3));
    }, [dispatch, history]);

    return null;
};

export default LogoutPage;
