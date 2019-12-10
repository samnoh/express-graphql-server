import React, { useCallback } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';

import { GET_POST } from 'graphql/queries';

const PostDetailContainer = styled.section``;

const Title = styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding-bottom: 18px;
    border-bottom: 1px solid #eaecef;
    margin-bottom: 15px;
    margin-bottom: 58px;

    & h1 {
        font-weight: 300;
        font-size: 42px;

        & span {
            color: blue;
            font-size: 14px;
            color: #aaa;
            margin-left: 4px;
        }
    }

    & a {
        font-weight: 300;
        font-size: 24px;
        margin-left: 8px;
        color: #888;
        text-align: right;
        vertical-align: bottom;
        align-self: flex-end;
        margin-left: 25px;
    }
`;

const EditButton = styled.button`
    position: absolute;
    cursor: pointer;
    border: none;
    padding: 8px 20px;
    font-size: 16px;
    border-radius: 4px;
    color: #fff;
    font-weight: 700;
    background-color: #61ceb3;
    outline: none;
    right: 0;
    bottom: -46px;
`;

const Description = styled.p`
    padding: 4px;
    font-size: 17px;
`;

const PostDetail = ({ match, history }) => {
    const auth = useSelector(state => state.auth);
    const { id } = match.params;
    const { loading, error, data } = useQuery(GET_POST, {
        variables: { id: parseInt(id) }
    });

    const onClick = useCallback(() => {
        history.push(`/post/${id}/edit`, {
            id,
            title: data.post.title,
            content: data.post.content
        });
    }, [data]);

    if (error) return <div>Error!</div>;

    if (loading) return <div>Loading...</div>;

    const { title, content, createdAt, user } = data.post;
    const datetime = new Date(parseInt(createdAt));

    return (
        <>
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <PostDetailContainer>
                <Title>
                    <h1>
                        {title} <span>{datetime.toLocaleDateString('en')}</span>
                    </h1>
                    <Link to={`/user/${user.id}`}>{user.username}</Link>
                    {user.id === auth.userId && <EditButton onClick={onClick}>Edit</EditButton>}
                </Title>
                <Description dangerouslySetInnerHTML={{ __html: content }} />
            </PostDetailContainer>
        </>
    );
};

export default withRouter(PostDetail);
