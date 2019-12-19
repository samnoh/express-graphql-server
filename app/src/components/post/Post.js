import React, { memo, useMemo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PostContainer = styled.section`
    color: #242424;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 48px;
    padding: 0 6px;
    border-bottom: 1px solid #eaecef;
`;

const Title = styled.h2`
    font-weight: 300;
    font-size: 38px;
    margin-bottom: 12px;
    flex-grow: 1;

    & a {
        display: block;
        width: 100%;
        padding-bottom: 20px;
    }

    & span {
        font-size: 15px;
        vertical-align: middle;
        margin-left: 8px;
        color: #888;
    }

    @media (hover: hover) {
        &:hover {
            opacity: 0.4;
        }
    }
`;

const Username = styled.span`
    text-align: right;
    display: block;
    color: #888;
    font-weight: 300;
    align-self: flex-end;
    margin-bottom: 20px;
    margin-left: 20px;

    @media (hover: hover) {
        &:hover {
            opacity: 0.4;
        }
    }
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

const DeleteButton = styled(Button)`
    color: #d93d75;
    align-self: flex-end;
    margin-bottom: 16px;
`;

const Post = memo(({ id, title, createdAt, simple, onDelete, user }) => {
    return (
        <PostContainer>
            <Title>
                <Link to={`/post/${id}`}>
                    {title} <span>{new Date(parseInt(createdAt)).toLocaleDateString('en')}</span>
                </Link>
            </Title>
            {!simple && (
                <Username>
                    <Link to={`/user/${user.id}`}>{user.username}</Link>
                </Username>
            )}
            {onDelete && <DeleteButton onClick={() => onDelete(id)}>Delete</DeleteButton>}
        </PostContainer>
    );
});

export default Post;
