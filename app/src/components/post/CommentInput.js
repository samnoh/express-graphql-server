import React, { useState, useCallback } from 'react';
import styled from 'styled-components';

import { Button, ButtonOutline, palette, media } from 'styles';

const ButtonContainer = styled.div`
    display: flex;
    justify-content: flex-end;
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

    ${media.tablet`
        font-size: 15px;
    `};
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
                {initialValue && <ButtonOutline onClick={onCancel}>Cancel</ButtonOutline>}
                <Button backgroundColor={palette.blue[5]} onClick={onClick} isUpdate={initialValue}>
                    {initialValue ? 'Update' : 'Add'} Comment
                </Button>
            </ButtonContainer>
        </>
    );
};

export default CommentInput;
