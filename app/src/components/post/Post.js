import React, { memo } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const PostContainer = styled.section`
    color: #242424;
    margin-bottom: 34px;
    padding: 0 10px 20px 6px;
    border-bottom: 1px solid #eaecef;

    @media (hover: hover) {
        &:hover {
            opacity: 0.6;
        }
    }
`;

const Title = styled.h2`
    font-weight: 300;
    font-size: 30px;
    margin-bottom: 12px;

    & span {
        font-size: 15px;
        vertical-align: middle;
        margin-left: 8px;
        color: #888;
    }
`;

const Description = styled.p`
    font-size: 16px;
    margin-left: 2px;
    color: #555;
`;

const Post = memo(({ id, title, content, user: { username, id: userId } }) => {
    return (
        <Link to={`/post/${id}`}>
            <PostContainer>
                <Title>
                    {title} <span>{username}</span>
                </Title>
                <Description>{content}</Description>
            </PostContainer>
        </Link>
    );
});

export default Post;
