import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';

import { ADD_COMMENT, DELETE_COMMENT } from 'graphql/queries';
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

const Comments = ({ post, id, refetch }) => {
    const dispatch = useDispatch();
    const [addComment, { error, loading, data: { addComment: isAdded } = {} }] = useMutation(
        ADD_COMMENT
    );
    const [deleteComment, { data: { deleteComment: isDeleted } = {} }] = useMutation(
        DELETE_COMMENT
    );

    const onDelete = useCallback(id => {
        deleteComment({ variables: { id } });
        refetch();
    }, []);

    useEffect(() => {
        if (error) {
            dispatch(showNoti('Error', 'danger', 3));
        }
    }, [error]);

    useEffect(() => {
        if (isAdded) {
            dispatch(showNoti('Successfully added', 'primary', 3));
        }
    }, [isAdded]);

    useEffect(() => {
        if (isDeleted) {
            dispatch(showNoti('Successfully deleted', 'primary', 3));
        }
    }, [isDeleted]);

    return (
        <>
            <CommentTitle>Comments</CommentTitle>
            {!post.comment.length && <NoItem>No Comment</NoItem>}
            {post.comment.map(c => (
                <Comment key={c.id} onDelete={onDelete} {...c}></Comment>
            ))}
            <CommentInput id={id} addComment={addComment} refetch={refetch} />
        </>
    );
};

export default Comments;
