import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { showNoti } from 'store/actions/noti';

const ErrorPage = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showNoti('API Error', 'danger', 10));
    });

    return null;
};

export default ErrorPage;
