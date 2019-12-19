import React, { useCallback, useEffect } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { useDispatch } from 'react-redux';

import { showNoti } from 'store/actions/noti';
import { GET_POST, DELETE_POST } from 'graphql/queries';
import ErrorPage from 'pages/ErrorPage';
import LoadingPage from 'pages/LoadingPage';
import Comments from 'components/post/Comments';
import PostDetailTemplate from 'components/post/PostDetailTemplate';
import PostDetailTitle from 'components/post/PostDetailTitle';

const PostDetailContainer = styled.section`
    padding-bottom: 40px;
    margin-bottom: 40px;
    flex-grow: 1;
`;

const Description = styled.p`
    padding: 4px;
    font-size: 17px;
`;

const PostDetail = ({ history, id }) => {
    const dispatch = useDispatch();

    const { called, loading, error, data: { post, favourite } = {}, refetch } = useQuery(GET_POST, {
        variables: { id }
    });
    const [deletePost, { data: isDeleted }] = useMutation(DELETE_POST);

    useEffect(() => {
        if (isDeleted) {
            history.push('/', { notiOnNextPage: true });
            dispatch(showNoti('Successfully deleted', 'danger', 3));
        }
    }, [isDeleted]);

    const onEdit = useCallback(() => {
        history.push(`/post/${id}/edit`, {
            id,
            title: post.title,
            content: post.content
        });
    }, [post, id]);

    const onDelete = useCallback(() => {
        deletePost({ variables: { id } });
    }, [id]);

    if (error) return <ErrorPage />;

    if (!called || loading) return <LoadingPage />;

    return (
        <PostDetailTemplate>
            <PostDetailContainer>
                <PostDetailTitle
                    {...post}
                    favourite={favourite}
                    onEdit={onEdit}
                    onDelete={onDelete}
                />
                <Description dangerouslySetInnerHTML={{ __html: post.content }} />
            </PostDetailContainer>
            <Comments comment={post.comment} id={id} refetch={refetch} />
        </PostDetailTemplate>
    );
};

export default withRouter(PostDetail);
