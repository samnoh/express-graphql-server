import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from '@apollo/react-hooks';
import { useMutation } from '@apollo/react-hooks';

import { GET_COMMENT, ADD_COMMENT, EDIT_COMMENT, DELETE_COMMENT } from 'graphql/queries';
import { showNoti } from 'store/actions/noti';
import LoadingPage from 'pages/LoadingPage';
import Comment from 'components/post/Comment';
import CommentInput from 'components/post/CommentInput';
import { Title, NoItem, Button } from 'styles';

const LIMIT = 5;

const Comments = ({ id }) => {
    const dispatch = useDispatch();
    const { loading, data: { commentsByPostId: comments } = {}, fetchMore, refetch } = useQuery(
        GET_COMMENT,
        {
            variables: { id }
        }
    );
    const [noMoreItem, setNoMoreItem] = useState(false);
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

    const onClick = useCallback(() => {
        fetchMore({
            variables: { pagination: { limit: LIMIT, offset: comments.length } },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                if (fetchMoreResult.commentsByPostId.length < LIMIT) setNoMoreItem(true);

                return {
                    ...prev,
                    ...{
                        commentsByPostId: [
                            ...prev.commentsByPostId,
                            ...fetchMoreResult.commentsByPostId
                        ]
                    }
                };
            }
        });
    }, [fetchMore, comments]);

    useEffect(() => {
        if (isAdded) {
            noMoreItem ? onClick() : refetch();
            setNoMoreItem(false);
            dispatch(showNoti('Successfully added', 'primary', 3));
        }
    }, [isAdded, dispatch, refetch]);

    useEffect(() => {
        if (isEdited) {
            refetch();
            setNoMoreItem(false);
            dispatch(showNoti('Successfully updated', 'primary', 3));
        }
    }, [isEdited, dispatch, refetch]);

    useEffect(() => {
        if (isDeleted) {
            refetch();
            setNoMoreItem(false);
            dispatch(showNoti('Successfully deleted', 'danger', 3));
        }
    }, [isDeleted, dispatch, refetch]);

    useEffect(() => {
        if (error) {
            dispatch(showNoti('Error', 'danger', 3));
        }
    }, [error, dispatch]);

    if (loading) return <LoadingPage />;

    return (
        <>
            <Title marginBottom="10px">Comments</Title>
            {!comments.length && <NoItem>No Comment</NoItem>}
            {comments.map(c => (
                <Comment key={c.id} onDelete={onDelete} onEdit={onEdit} {...c}></Comment>
            ))}
            {noMoreItem || comments.length < 5 ? null : (
                <Button style={{ width: '100%', marginTop: '20px' }} onClick={onClick}>
                    Load More
                </Button>
            )}
            <CommentInput id={id} addComment={onAdd} />
        </>
    );
};

export default Comments;
