import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import Comment from 'components/post/Comment';

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
`;

const CommentTitle = styled.h2`
    font-size: 26px;
    margin: 40px 0;
    color: #333;
`;

const CommentInput = styled.textarea`
    outline: none;
    width: 100%;
    font-size: 17px;
    border-radius: 8px;
    padding: 18px 12px;
    background: #f9fafc;
    border: 1px solid #dae1e7;
    margin-top: 20px;
    margin-bottom: 10px;
`;

const CommentButton = styled(Button)`
    background-color: #4295f7;
    float: right;
`;

const NoItem = styled.div`
    color: #aaa;
    margin: 60px 0;
    text-align: center;
    user-select: none;
    font-size: 17px;
`;

const Comments = ({ post, id, addComment }) => {
    const [value, setValue] = useState('');

    const onClick = useCallback(() => {
        addComment({ variables: { id, content: value } });
        setValue('');
    }, [value]);

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    return (
        <>
            <CommentTitle>Comments</CommentTitle>
            {!post.comment.length && <NoItem>No Comment</NoItem>}
            {post.comment.map(c => (
                <Comment key={c.id} {...c}></Comment>
            ))}
            <CommentInput
                multiline
                defaultValue={value}
                onChange={onChange}
                placeholder="Add a comment"
            />
            <CommentButton onClick={onClick}>Add Comment</CommentButton>
        </>
    );
};

export default Comments;
