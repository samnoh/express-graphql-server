import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

import { showNoti } from 'store/actions/noti';
import { Title } from 'styles';

const ErrorPage = ({ message }) => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(showNoti(message ? message : 'API Error', 'danger', 10));
    });

    return (
        <Title fontSize="30px" style={{ textAlign: 'center', paddingTop: '100px' }}>
            Sorry but you just found an error page!
        </Title>
    );
};

export default ErrorPage;
