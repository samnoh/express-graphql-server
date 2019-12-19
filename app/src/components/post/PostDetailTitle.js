import React, { useCallback, useState, useEffect, memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useMutation } from '@apollo/react-hooks';

import { showNoti } from 'store/actions/noti';
import { ADD_FAVOURITE, DELETE_FAVOURITE } from 'graphql/queries';

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

const Button = styled.button`
    cursor: pointer;
    border: none;
    padding: 8px 20px;
    font-size: 16px;
    border-radius: 4px;
    color: #fff;
    font-weight: 700;
    outline: none;
    margin-left: 12px;
    user-select: none;
`;

const ButtonContainer = styled.div`
    position: absolute;
    right: 0;
    bottom: -46px;
`;

const EditButton = styled(Button)`
    background-color: #4295f7;
`;

const DeleteButton = styled(Button)`
    background-color: #d93d75;
`;

const FavButton = styled(Button)`
    background-color: ${props => (props.saved ? '#D93D75' : '#61ceb3')};
`;

const PostDetailTitle = memo(
    ({ favourite, id, user, title, createdAt, onEdit, onDelete }) => {
        const dispatch = useDispatch();
        const auth = useSelector(state => state.auth);
        const [saved, setSaved] = useState(favourite);
        const [addFavourite, { loading: addLoading, data: isAdded }] = useMutation(ADD_FAVOURITE);
        const [deleteFavourite, { loading: deleteLoading, data: isDeleted }] = useMutation(
            DELETE_FAVOURITE
        );

        const onFavClick = useCallback(() => {
            saved ? deleteFavourite({ variables: { id } }) : addFavourite({ variables: { id } });
            setSaved(!saved);
        }, [id, saved, setSaved]);

        useEffect(() => {
            if (isAdded) {
                setSaved(true);
                dispatch(showNoti('Successfully added', 'primary', 3));
            }
        }, [isAdded]);

        useEffect(() => {
            if (isDeleted) {
                setSaved(false);
                dispatch(showNoti('Successfully deleted', 'danger', 3));
            }
        }, [isDeleted]);

        return (
            <Title>
                <h1>
                    {title} <span>{new Date(parseInt(createdAt)).toLocaleDateString('en')}</span>
                </h1>
                <Link to={`/user/${user.id}`}>{user.username}</Link>
                <ButtonContainer>
                    {auth.userId && (
                        <FavButton
                            onClick={onFavClick}
                            saved={saved}
                            disabled={addLoading || deleteLoading}>
                            {saved ? 'Delete' : 'Add to'} favourites
                        </FavButton>
                    )}
                    {user.id === auth.userId && (
                        <>
                            <EditButton onClick={onEdit}>Edit</EditButton>
                            <DeleteButton onClick={onDelete}>Delete</DeleteButton>
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
