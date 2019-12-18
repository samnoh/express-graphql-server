import React, { memo, useCallback } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    margin: 24px 0 0;
    background: #f9fafc;
    border: 1px solid ${props => (props.isMyComment ? '#4295f7' : '#dae1e7')};
    border-radius: 8px;
    padding: 22px 18px 40px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const LeftContainer = styled.div``;

const Content = styled.div`
    font-size: 22px;
    white-space: pre-line;
`;

const DateTime = styled.div`
    font-size: 14px;
    color: #aaa;
    position: absolute;
    bottom: 12px;
    margin-left: -0.5px;
`;

const RightContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: -30px;
    margin-left: 12px;
`;

const Username = styled.div`
    font-size: 14px;
    color: #aaa;
`;

const Button = styled.button`
    cursor: pointer;
    border: none;
    font-size: 14px;
    border-radius: 4px;
    font-weight: bold;
    outline: none;
    margin-left: 22px;
    background: #f9fafc;
`;

const EditButton = styled(Button)`
    color: #4295f7;
`;

const DeleteButton = styled(Button)`
    color: #d93d75;
`;

const Comment = memo(({ id, content, user, createdAt, onEdit, onDelete }) => {
    const auth = useSelector(state => state.auth);
    const isMyComment = auth.userId === user.id;
    const datetime = new Date(parseInt(createdAt));

    return (
        <Container isMyComment={isMyComment}>
            <LeftContainer>
                <Content>{content}</Content>
                <DateTime>{datetime.toLocaleDateString('en')}</DateTime>
            </LeftContainer>
            <RightContainer>
                {isMyComment ? (
                    <>
                        <EditButton>Edit</EditButton>
                        <DeleteButton onClick={() => onDelete(id)}>Delete</DeleteButton>
                    </>
                ) : (
                    <Username>
                        <Link to={`/user/${user.id}`}>{user.username}</Link>
                    </Username>
                )}
            </RightContainer>
        </Container>
    );
});

export default Comment;
