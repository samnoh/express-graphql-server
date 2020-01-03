import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { fadeIn, moveUp } from 'styles';
import { closeNoti } from 'store/actions/noti';

const NotiContainer = styled.div`
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 300px;
    min-height: 60px;
    font-size: 18px;
    background-color: ${props => props.background};
    color: ${props => props.color};
    border-radius: 8px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    animation: ${fadeIn} 0.3s ease-in-out forwards, ${moveUp} 0.4s ease-in-out forwards;
    user-select: none;
`;

const Notification = ({ location }) => {
    const dispatch = useDispatch();
    const noti = useSelector(state => state.noti);

    useEffect(() => {
        if (location.state && location.state.notiOnNextPage) delete location.state.notiOnNextPage;
        else dispatch(closeNoti());
    }, [location.pathname, dispatch, location.state]);

    if (!noti.show) return null;

    return (
        <NotiContainer background={noti.background} color={noti.color}>
            {noti.message}
        </NotiContainer>
    );
};

export default withRouter(Notification);
