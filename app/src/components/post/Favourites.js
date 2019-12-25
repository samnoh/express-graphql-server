import React, { useCallback, useEffect, useState } from 'react';
import Helmet from 'react-helmet';
import { useQuery, useMutation } from '@apollo/react-hooks';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { Redirect } from 'react-router-dom';

import { showNoti } from 'store/actions/noti';
import { GET_FAVOURITES, DELETE_FAVOURITE } from 'graphql/queries';
import Post from './Post';
import ErrorPage from 'pages/ErrorPage';
import LoadingPage from 'pages/LoadingPage';
import Pagination from './Pagination';

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

const Favourites = ({ id, page }) => {
    const dispatch = useDispatch();
    const [numPostOnPage] = useState(10);
    const { error, loading, data: { favourites, favouritesCount } = {}, refetch } = useQuery(
        GET_FAVOURITES,
        {
            variables: {
                id,
                pagination: { offset: page * numPostOnPage - numPostOnPage, limit: numPostOnPage }
            },
            fetchPolicy: 'cache-and-network'
        }
    );
    const [deleteFavourite, { data: isDeleted }] = useMutation(DELETE_FAVOURITE);

    const onDelete = useCallback(
        id => {
            deleteFavourite({ variables: { id } });
        },
        [deleteFavourite]
    );

    useEffect(() => {
        if (isDeleted) {
            refetch();
            dispatch(showNoti('Successfully deleted', 'danger', 3));
        }
    }, [isDeleted, refetch, dispatch]);

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
            {favouritesCount && !favourites.length ? (
                <Redirect
                    to={`/user/${id}/favourites?page=${Math.ceil(favouritesCount / numPostOnPage)}`}
                />
            ) : (
                <Pagination
                    currPage={page ? Math.abs(page) : 1}
                    total={favouritesCount}
                    nPostOnPage={numPostOnPage}
                />
            )}
            {!favourites.length && <NoItem>No Favourite</NoItem>}
        </>
    );
};

export default Favourites;
