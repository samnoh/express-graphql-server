import React, { useCallback, useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation, useQuery } from '@apollo/react-hooks';

import { showNoti } from 'store/actions/noti';
import { Button } from 'styles';
import palette from 'styles/palette';
import { ADD_FAVOURITE, DELETE_FAVOURITE, GET_FAVOURITE } from 'graphql/queries';

const Title = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 18px;
    border-bottom: 1px solid #eaecef;
    margin-bottom: 15px;
    margin-bottom: 58px;

    & h1 {
        font-weight: 300;
        font-size: 42px;

        & span {
            font-size: 14px;
            color: #aaa;
            margin-left: 4px;
            user-select: none;
        }
    }

    & a {
        font-weight: 300;
        font-size: 24px;
        margin-left: 8px;
        color: #888;
        text-align: right;
        vertical-align: bottom;
        align-self: flex-end;
        margin-left: 25px;
    }
`;

const ButtonContainer = styled.div`
    position: absolute;
    right: 0;
    bottom: -46px;
`;

const PostDetailTitle = memo(
    ({ id, user, title, createdAt, onEdit, onDelete }) => {
        const dispatch = useDispatch();
        const auth = useSelector(state => state.auth);
        const { data: { favourite } = {} } = useQuery(GET_FAVOURITE, {
            variables: { id },
            fetchPolicy: 'cache-and-network'
        });
        const [saved, setSaved] = useState(false);
        const [addFavourite, { loading: addLoading, data: isAdded }] = useMutation(ADD_FAVOURITE);
        const [deleteFavourite, { loading: deleteLoading, data: isDeleted }] = useMutation(
            DELETE_FAVOURITE
        );

        const onFavClick = useCallback(() => {
            saved ? deleteFavourite({ variables: { id } }) : addFavourite({ variables: { id } });
        }, [id, saved, deleteFavourite, addFavourite]);

        useEffect(() => {
            if (isAdded) {
                setSaved(true);
                dispatch(showNoti('Successfully added', 'primary', 3));
            }
        }, [isAdded, dispatch]);

        useEffect(() => {
            if (isDeleted) {
                setSaved(false);
                dispatch(showNoti('Successfully deleted', 'danger', 3));
            }
        }, [isDeleted, dispatch]);

        useEffect(() => {
            setSaved(favourite);
        }, [favourite]);

        return (
            <Title>
                <h1>
                    {title} <span>{new Date(parseInt(createdAt)).toLocaleDateString('en')}</span>
                </h1>
                <Link to={`/user/${user.id}`}>{user.username}</Link>
                <ButtonContainer>
                    {auth.userId && (
                        <Button
                            onClick={onFavClick}
                            backgroundColor={saved ? palette.red[6] : palette.green[5]}
                            disabled={addLoading || deleteLoading}>
                            {saved ? 'Delete' : 'Add to'} Favourites
                        </Button>
                    )}
                    {user.id === auth.userId && (
                        <>
                            <Button backgroundColor={palette.blue[5]} onClick={onEdit}>
                                Edit
                            </Button>
                            <Button backgroundColor={palette.red[6]} onClick={onDelete}>
                                Delete
                            </Button>
                        </>
                    )}
                </ButtonContainer>
            </Title>
        );
    },
    (currProps, nextProps) => {
        if (currProps.title !== nextProps.title) return false;
        return true; // never re-render except for updated title prop
    }
);

export default PostDetailTitle;
