import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
`;

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
    margin: 24px 0 12px;
`;

const CommentButton = styled(Button)`
    background-color: ${props => (props.isUpdate ? '#4295f7' : '#61ceb3')};
    width: 180px;
    margin-left: 12px;
`;

const CancelButton = styled(Button)`
    border: 1px solid #444;
    color: #444;
    width: 180px;
`;

const CommentInput = ({ id, addComment, onCancel, initialValue = '' }) => {
    const [value, setValue] = useState(initialValue);

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    const onClick = useCallback(() => {
        addComment(id, value);
        setValue('');
    }, [value, id, addComment]);

    return (
        <>
            <CommentTextarea value={value} onChange={onChange} placeholder="Add a comment" />
            <ButtonContainer>
                {initialValue && <CancelButton onClick={onCancel}>Cancel</CancelButton>}
                <CommentButton onClick={onClick} isUpdate={initialValue}>
                    {initialValue ? 'Update' : 'Add'} Comment
                </CommentButton>
            </ButtonContainer>
        </>
    );
};

export default CommentInput;
