import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    position: relative;
    margin: 30px 0 10px;
    background: #f9fafc;
    border: 1px solid ${props => (props.isMyComment ? '#61ceb3' : '#dae1e7')};
    border-radius: 8px;
    padding: 18px 18px 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
`;

const LeftContainer = styled.div``;

const Content = styled.div`
    font-size: 22px;
`;

const DateTime = styled.div`
    font-size: 14px;
    color: #aaa;
    position: absolute;
    bottom: 8px;
`;

const RightContainer = styled.div`
    display: flex;
    justify-content: space-between;
    margin-bottom: -20px;
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

const Comment = ({ id, content, user, createdAt, onEdit, onDelete }) => {
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
                        <DeleteButton>Delete</DeleteButton>
                    </>
                ) : (
                    <Username>
                        <Link to={`/user/${user.id}`}>{user.username}</Link>
                    </Username>
                )}
            </RightContainer>
        </Container>
    );
};

export default Comment;
