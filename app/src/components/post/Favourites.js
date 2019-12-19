import React, { useCallback, useEffect } from 'react';
import Helmet from 'react-helmet';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { showNoti } from 'store/actions/noti';
import { GET_FAVOURITES, DELETE_FAVOURITE } from 'graphql/queries';
import Post from './Post';
import ErrorPage from 'pages/ErrorPage';
import LoadingPage from 'pages/LoadingPage';

const Title = styled.h2`
    color: #444;
    font-size: 26px;
    margin-bottom: 40px;
`;

const NoItem = styled.div`
    font-size: 24px;
    padding: 62px 0 120px;
    text-align: center;
    color: #aaa;
    user-select: none;
`;

const Favourites = ({ id }) => {
    const dispatch = useDispatch();
    const { error, loading, data: { favourites, favouritesCount } = {}, refetch } = useQuery(
        GET_FAVOURITES,
        {
            variables: { id },
            fetchPolicy: 'cache-and-network'
        }
    );
    const [deleteFavourite, { loading: deleteLoading, data: isDeleted }] = useMutation(
        DELETE_FAVOURITE
    );

    const onDelete = useCallback(id => {
        deleteFavourite({ variables: { id } });
    }, []);

    useEffect(() => {
        if (isDeleted) {
            refetch();
            dispatch(showNoti('Successfully deleted', 'danger', 3));
        }
    }, [isDeleted]);

    if (error) return <ErrorPage message={error.message} />;

    if (loading) return <LoadingPage />;

    return (
        <>
            <Helmet>
                <title>Favourites ({'' + favouritesCount})</title>
            </Helmet>
            <Title>Favourites</Title>
            {favourites.map(({ post }) => (
                <Post {...post} key={post.id} simple onDelete={onDelete} />
            ))}
            {!favourites.length && <NoItem>No Favourite</NoItem>}
        </>
    );
};

export default Favourites;
