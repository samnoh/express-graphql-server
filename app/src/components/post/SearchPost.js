import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

import { SEARCH_POST } from 'graphql/queries';
import ErrorPage from 'pages/ErrorPage';
import LoadingPage from 'pages/LoadingPage';
import Post from 'components/post/Post';
import { Button, palette } from 'styles';

const NoItem = styled.div`
    color: ${palette.gray[5]};
    margin: 60px 0;
    text-align: center;
    user-select: none;
    font-size: 20px;
`;

const ButtonContainer = styled.div`
    text-align: center;
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

    if (!query || error) return <ErrorPage message="No Result" />;

    if (!search.length) return <NoItem>No Result</NoItem>;

    return (
        <>
            {search.map(post => (
                <Post key={post.id} {...post} />
            ))}
            <ButtonContainer>
                {noMoreItem ? (
                    <Button backgroundColor={palette.gray[6]} disabled>
                        No More Results
                    </Button>
                ) : (
                    <Button backgroundColor={palette.blue[5]} onClick={onClick}>
                        Search More
                    </Button>
                )}
            </ButtonContainer>
        </>
    );
};

export default SearchPost;
