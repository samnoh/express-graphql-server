import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

import { GET_POSTS_BY_USER_ID, SEARCH_POST } from 'graphql/queries';
import ErrorPage from 'pages/ErrorPage';
import LoadingPage from 'pages/LoadingPage';
import Post from 'components/post/Post';
import { Button, ButtonOutline, palette } from 'styles';

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

const SearchPost = ({ query, userSearch }) => {
    const [noMoreItem, setNoMoreItem] = useState(false);
    const key = userSearch ? 'postsByUserId' : 'search';
    const { loading, error, data: { [key]: search } = {}, fetchMore } = useQuery(
        userSearch ? GET_POSTS_BY_USER_ID : SEARCH_POST,
        {
            variables: {
                [userSearch ? 'username' : 'query']: query,
                pagination: { limit: LIMIT }
            }
        }
    );

    const onClick = useCallback(() => {
        fetchMore({
            variables: { pagination: { limit: LIMIT, offset: search.length } },
            updateQuery: (prev, { fetchMoreResult }) => {
                if (!fetchMoreResult) return prev;
                if (fetchMoreResult[key].length < LIMIT) setNoMoreItem(true);

                return {
                    ...prev,
                    ...{
                        [key]: [...prev[key], ...fetchMoreResult[key]]
                    }
                };
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
                {noMoreItem || search.length < 5 ? (
                    <ButtonOutline noHover disabled>
                        No More Results
                    </ButtonOutline>
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
