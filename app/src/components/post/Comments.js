import React, { useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';

import { ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from 'graphql/queries';
import { showNoti } from 'store/actions/noti';
import Comment from 'components/post/Comment';
import CommentInput from 'components/post/CommentInput';

const CommentTitle = styled.h2`
    font-size: 26px;
    color: #444;
`;

const NoItem = styled.div`
    color: #aaa;
    margin: 60px 0;
    text-align: center;
    user-select: none;
    font-size: 17px;
`;

const Comments = ({ comment, id, refetch }) => {
    const dispatch = useDispatch();
    const [addComment, { error, data: isAdded }] = useMutation(ADD_COMMENT);
    const [deleteComment, { data: isDeleted }] = useMutation(DELETE_COMMENT);
    const [editComment, { data: isEdited }] = useMutation(EDIT_COMMENT);

    const onAdd = useCallback(
        (id, content) => {
            addComment({ variables: { id, content } });
        },
        [addComment]
    );

    const onDelete = useCallback(
        id => {
            deleteComment({ variables: { id } });
        },
        [deleteComment]
    );

    const onEdit = useCallback(
        (id, content) => {
            editComment({ variables: { id, content } });
        },
        [editComment]
    );

    useEffect(() => {
        if (isAdded) {
            refetch();
            dispatch(showNoti('Successfully added', 'primary', 3));
        }
    }, [isAdded, dispatch, refetch]);

    useEffect(() => {
        if (isEdited) {
            refetch();
            dispatch(showNoti('Successfully updated', 'primary', 3));
        }
    }, [isEdited, dispatch, refetch]);

    useEffect(() => {
        if (isDeleted) {
            refetch();
            dispatch(showNoti('Successfully deleted', 'danger', 3));
        }
    }, [isDeleted, dispatch, refetch]);

    useEffect(() => {
        if (error) {
            dispatch(showNoti('Error', 'danger', 3));
        }
    }, [error, dispatch]);

    return (
        <>
            <CommentTitle>Comments</CommentTitle>
            {!comment.length && <NoItem>No Comment</NoItem>}
            {comment.map(c => (
                <Comment key={c.id} onDelete={onDelete} onEdit={onEdit} {...c}></Comment>
            ))}
            <CommentInput id={id} addComment={onAdd} />
        </>
    );
};

export default Comments;
