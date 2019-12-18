import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { useMutation } from '@apollo/react-hooks';

import { ADD_COMMENT } from 'graphql/queries';
import Comment from 'components/post/Comment';
import { showNoti } from 'store/actions/noti';

const Button = styled.button`
    cursor: pointer;
    border: none;
    padding: 8px 20px;
    font-size: 16px;
    border-radius: 4px;
    color: #fff;
    font-weight: 700;
`;

const CommentTitle = styled.h2`
    font-size: 26px;
    color: #444;
`;

const CommentInput = styled.textarea`
    outline: none;
    width: 100%;
    font-size: 20px;
    border-radius: 8px;
    padding: 22px 18px;
    background: #f9fafc;
    border: 1px solid #dae1e7;
    margin: 24px 0;
`;

const CommentButton = styled(Button)`
    background-color: #4295f7;
    width: 160px;
    align-self: flex-end;
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
    const [value, setValue] = useState('');

    const [addComment, { error, loading, data: { addComment: comment } = {} }] = useMutation(
        ADD_COMMENT
    );

    const onClick = useCallback(() => {
        addComment({ variables: { id, content: value } });
        setValue('');
        refetch();
        dispatch(showNoti('Successfully added', 'primary', 3));
    }, [value]);

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    useEffect(() => {
        if (error) {
            dispatch(showNoti('Error', 'danger', 3));
        }
    }, [error]);

    return (
        <>
            <CommentTitle>Comments</CommentTitle>
            {!post.comment.length && <NoItem>No Comment</NoItem>}
            {post.comment.map(c => (
                <Comment key={c.id} {...c}></Comment>
            ))}
            <CommentInput multiline value={value} onChange={onChange} placeholder="Add a comment" />
            <CommentButton onClick={onClick} disabled={loading}>
                Add Comment
            </CommentButton>
        </>
    );
};

export default Comments;
