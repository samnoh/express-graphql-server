import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
    padding-bottom: 15px;
    margin: 30px 0 10px;
    border-bottom: 1px solid #eaecef;
    display: flex;
    justify-content: space-between;
`;

const Content = styled.div`
    font-size: 22px;
`;

const Username = styled.div`
    font-size: 14px;
    color: #aaa;
    align-self: flex-end;
`;

const Comment = ({ id, content, user }) => {
    return (
        <Container>
            <Content>{content}</Content>
            <Username>{user.username}</Username>
        </Container>
    );
};

export default Comment;
