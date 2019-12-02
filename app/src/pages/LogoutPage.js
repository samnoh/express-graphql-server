import { useEffect } from 'react';

import { useDispatch } from 'react-redux';
import { removeToken } from 'store/actions/auth';

const LogoutPage = ({ history }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(removeToken());
        history.replace('/login');
    }, []);

    return null;
};

export default LogoutPage;
