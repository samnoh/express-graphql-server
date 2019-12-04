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

const Post = memo(({ id, title, createdAt, user: { username, id: userId } }) => {
    const datetime = new Date(parseInt(createdAt));

    return (
        <PostContainer>
            <Title>
                <Link to={`/post/${id}`}>
                    {title} <span>{datetime.toLocaleDateString('en')}</span>
                </Link>
            </Title>
            <Username>
                <Link to={`/user/${userId}`}>{username}</Link>
            </Username>
        </PostContainer>
    );
});

export default Post;
