import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { withRouter } from 'react-router-dom';

import { fadeIn } from 'styles/animation';
import { closeNoti } from 'store/actions/noti';

const NotiContainer = styled.div`
    position: fixed;
    top: 20px;
    margin: 0 auto;
    left: 0;
    right: 0;
    width: 300px;
    min-height: 60px;
    background-color: ${props => props.background};
    color: ${props => props.color};
    border-radius: 18px;
    padding: 10px;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999;
    animation: ${fadeIn} 0.3s ease-in forwards;
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
