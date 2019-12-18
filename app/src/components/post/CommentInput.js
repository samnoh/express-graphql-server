import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

const Button = styled.button`
    cursor: pointer;
    border: none;
    padding: 8px 20px;
    font-size: 16px;
    border-radius: 4px;
    color: #fff;
    font-weight: 700;
`;

const CommentTextarea = styled.textarea`
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
    width: 180px;
    align-self: flex-end;
`;

const CommentInput = ({ id, addComment, initialValue = '' }) => {
    const [value, setValue] = useState(initialValue);

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    const onClick = useCallback(() => {
        addComment(id, value);
        setValue('');
    }, [value]);

    return (
        <>
            <CommentTextarea value={value} onChange={onChange} placeholder="Add a comment" />
            <CommentButton onClick={onClick}>
                {initialValue ? 'Update' : 'Add'} Comment
            </CommentButton>
        </>
    );
};

export default CommentInput;
