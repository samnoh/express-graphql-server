import React, { memo, useState, useEffect, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import CommentInput from 'components/post/CommentInput';
import palette from 'styles/palette';
import { ButtonInline } from 'styles';

const Container = styled.div`
    position: relative;
    margin: 24px 0 0;
    background: ${palette.gray[0]};
    border: 1px solid ${props => (props.isMyComment ? palette.blue[2] : palette.gray[3])};
    border-radius: 8px;
    padding: 22px 18px 40px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const LeftContainer = styled.div`
    width: 100%;
`;

const Content = styled.div`
    font-size: 22px;
    white-space: pre-line;
`;

const DateTime = styled.div`
    font-size: 14px;
    color: ${palette.gray[5]};
    position: absolute;
    bottom: 12px;
    margin-left: -0.5px;
    user-select: none;
`;

const RightContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: -30px;
    margin-left: 12px;
    user-select: none;
`;

const Username = styled.div`
    font-size: 14px;
    color: ${palette.gray[5]};
`;

const Comment = memo(({ id, content, user, createdAt, updatedAt, onEdit, onDelete, profile }) => {
    const auth = useSelector(state => state.auth);
    const [isEditing, setIsEditing] = useState(false);
    const isMyComment = auth.userId === user.id;
    const datetime = new Date(parseInt(createdAt));

    const onCancel = useCallback(() => {
        setIsEditing(false);
    }, []);

    useEffect(() => {
        setIsEditing(false);
    }, [updatedAt]);

    if (isEditing)
        return (
            <CommentInput initialValue={content} addComment={onEdit} id={id} onCancel={onCancel} />
        );

    return (
        <Container isMyComment={isMyComment}>
            <LeftContainer>
                <Content>{content}</Content>
                <DateTime>{datetime.toLocaleDateString('en')}</DateTime>
            </LeftContainer>
            {!profile && (
                <RightContainer>
                    {isMyComment ? (
                        <>
                            <ButtonInline
                                color={palette.gray[5]}
                                onClick={() => setIsEditing(true)}>
                                Edit
                            </ButtonInline>
                            <ButtonInline color={palette.red[4]} onClick={() => onDelete(id)}>
                                Delete
                            </ButtonInline>
                        </>
                    ) : (
                        <Username>
                            <Link to={`/user/${user.id}`}>{user.username}</Link>
                        </Username>
                    )}
                </RightContainer>
            )}
        </Container>
    );
});

export default Comment;
