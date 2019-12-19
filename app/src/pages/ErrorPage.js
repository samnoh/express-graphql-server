import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { showNoti } from 'store/actions/noti';

const Title = styled.h2`
    color: #444;
    font-size: 40px;
    text-align: center;
    margin-top: 120px;
`;

const ErrorPage = ({ message }) => {
    const dispatch = useDispatch();
    console.log(message);
    useEffect(() => {
        dispatch(showNoti(message ? message : 'API Error', 'danger', 10));
    });

    return <Title>Sorry but you just found an error page!</Title>;
};

export default ErrorPage;
