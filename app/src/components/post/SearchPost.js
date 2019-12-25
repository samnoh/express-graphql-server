import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

import { SEARCH_POST } from 'graphql/queries';
import ErrorPage from 'pages/ErrorPage';
import LoadingPage from 'pages/LoadingPage';
import Post from 'components/post/Post';

const NoItem = styled.div`
    color: #aaa;
    margin: 60px 0;
    text-align: center;
    user-select: none;
    font-size: 20px;
`;

const ButtonContainer = styled.div`
    text-align: center;
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
    margin: 60px 0;
    user-select: none;
`;

const FetchMoreButton = styled(Button)`
    background: #74ccb6;
`;

const LIMIT = 5;

const SearchPost = ({ query }) => {
    const [noMoreItem, setNoMoreItem] = useState(false);
    const { loading, error, data: { search } = {}, fetchMore } = useQuery(SEARCH_POST, {
        variables: { query, pagination: { limit: LIMIT } }
    });

    const onClick = useCallback(() => {
        fetchMore({
            variables: { pagination: { limit: LIMIT, offset: search.length } },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;

                if (fetchMoreResult.search.length < LIMIT) setNoMoreItem(true);
                return { ...prev, ...{ search: [...prev.search, ...fetchMoreResult.search] } };
            }
        });
    }, [fetchMore, search]);

    useEffect(() => {
        setNoMoreItem(false);
    }, [query]);

    if (loading) return <LoadingPage />;

    if (error) return <ErrorPage />;

    if (!search.length) return <NoItem>No Result</NoItem>;

    return (
        <>
            {search.map(post => (
                <Post key={post.id} {...post} />
            ))}
            <ButtonContainer>
                {noMoreItem ? (
                    <FetchMoreButton disabled>No More Result</FetchMoreButton>
                ) : (
                    <FetchMoreButton onClick={onClick}>Search More</FetchMoreButton>
                )}
            </ButtonContainer>
        </>
    );
};

export default SearchPost;
