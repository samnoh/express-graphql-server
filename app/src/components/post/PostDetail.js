import React, { useCallback, useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useLazyQuery, useMutation } from '@apollo/react-hooks';
import { withRouter, Link } from 'react-router-dom';
import styled from 'styled-components';
import Helmet from 'react-helmet';
import { useSelector } from 'react-redux';

import { GET_POST, DELETE_POST, ADD_COMMENT } from 'graphql/queries';
import { showNoti } from 'store/actions/noti';
import ErrorPage from 'pages/ErrorPage';
import LoadingPage from 'pages/LoadingPage';
import Comments from 'components/post/Comments';

const PostDetailContainer = styled.section`
    padding-bottom: 40px;
    margin-bottom: 60px;
    min-height: calc(100vh - 568px);
`;

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

const ButtonContainer = styled.div`
    position: absolute;
    right: 0;
    bottom: -46px;
`;

const Button = styled.button`
    cursor: pointer;
    border: none;
    padding: 8px 20px;
    font-size: 16px;
    border-radius: 4px;
    color: #fff;
    font-weight: 700;
    outline: none;
    margin-left: 12px;
`;

const EditButton = styled(Button)`
    background-color: #4295f7;
`;

const DeleteButton = styled(Button)`
    background-color: #d93d75;
`;

const FavButton = styled(Button)`
    background-color: ${props => (props.saved ? '#D93D75' : '#61ceb3')};
`;

const Description = styled.p`
    padding: 4px;
    font-size: 17px;
`;

const PostDetail = ({ history, id }) => {
    const dispatch = useDispatch();
    const [saved, setSaved] = useState(false);
    const auth = useSelector(state => state.auth);
    const [getPost, { called, loading, error, data: { post } = {} }] = useLazyQuery(GET_POST, {
        variables: { id },
        fetchPolicy: 'no-cache'
    });
    const [addComment, { data: { addComment: comment } = {} }] = useMutation(ADD_COMMENT);
    const [deletePost, { data: isDeleted }] = useMutation(DELETE_POST);

    const onEditClick = useCallback(() => {
        history.push(`/post/${id}/edit`, {
            id,
            title: post.title,
            content: post.content
        });
    }, [post, id]);

    const onDeleteClick = useCallback(() => {
        deletePost({ variables: { id } });
    }, [id]);

    const onFavClick = useCallback(() => {
        alert(saved ? 'deleted' : 'added');
        setSaved(!saved);
    }, [post, id, saved, setSaved]);

    useEffect(() => {
        getPost();
        if (comment && comment.content) {
            dispatch(showNoti('Successfully added', 'primary', 3));
        }
    }, [comment]);

    useEffect(() => {
        if (isDeleted) {
            history.push('/');
        }
    }, [isDeleted]);

    if (error) return <ErrorPage />;

    if (!called || loading) return <LoadingPage />;

    const { title, content, createdAt, user } = post;
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
                    <ButtonContainer>
                        <FavButton onClick={onFavClick} saved={saved}>
                            {saved ? 'Delete' : 'Add to'} favourites
                        </FavButton>
                        {user.id === auth.userId && (
                            <>
                                <EditButton onClick={onEditClick}>Edit</EditButton>
                                <DeleteButton onClick={onDeleteClick}>Delete</DeleteButton>
                            </>
                        )}
                    </ButtonContainer>
                </Title>
                <Description dangerouslySetInnerHTML={{ __html: content }} />
            </PostDetailContainer>
            <Comments post={post} addComment={addComment} id={id} />
        </>
    );
};

export default withRouter(PostDetail);
