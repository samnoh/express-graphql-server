import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

import { ButtonInline, palette } from 'styles';

const PostContainer = styled.div`
    color: ${palette.gray[8]};
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 48px;
    padding: 0 6px;
    border-bottom: 1px solid ${palette.gray[2]};
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
        color: ${palette.gray[5]};
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
    color: ${palette.gray[5]};
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
            {onDelete && (
                <ButtonInline
                    color={palette.red[4]}
                    style={{ alignSelf: 'flex-end', marginBottom: '16px' }}
                    onClick={() => onDelete(id)}>
                    Delete
                </ButtonInline>
            )}
        </PostContainer>
    );
});

export default Post;
