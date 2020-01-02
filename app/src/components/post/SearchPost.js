import React, { useCallback, useEffect, useState } from 'react';
import { useQuery } from '@apollo/react-hooks';
import styled from 'styled-components';

import { GET_POSTS_BY_USER_ID, SEARCH_POST } from 'graphql/queries';
import ErrorPage from 'pages/ErrorPage';
import LoadingPage from 'pages/LoadingPage';
import Post from 'components/post/Post';
import { Button, palette, NoItem } from 'styles';

const ButtonContainer = styled.div`
    text-align: center;
`;

const GRAPHQL_SEARCH_QUERY = {
    // default
    search: {
        graphql: SEARCH_POST,
        key: 'search',
        variable: 'query'
    },
    title: {
        graphql: SEARCH_POST,
        key: 'search',
        variable: 'query'
    },
    content: {
        graphql: SEARCH_POST,
        key: 'search',
        variable: 'query'
    },
    user: {
        graphql: GET_POSTS_BY_USER_ID,
        key: 'postsByUserId',
        variable: 'username'
    }
};

const LIMIT = 5;

const SearchPost = ({ query, option }) => {
    const [noMoreItem, setNoMoreItem] = useState(false);
    const { graphql, key, variable } = GRAPHQL_SEARCH_QUERY[option ? option : 'search'];
    const { loading, error, data: { [key]: search } = {}, fetchMore } = useQuery(graphql, {
        variables: {
            [variable]: query,
            [option === 'content' && 'content']: true,
            pagination: { limit: LIMIT }
        }
    });
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
    }, [fetchMore, search, key]);

    useEffect(() => {
        setNoMoreItem(false);
    }, [query]);

    if (loading) return <LoadingPage />;

    if (error) return <ErrorPage message="No Result" />;

    if (!search.length) return <NoItem>No Result</NoItem>;

    return (
        <>
            {search.map(post => (
                <Post key={post.id} {...post} />
            ))}
            <ButtonContainer>
                {noMoreItem || search.length < 5 ? null : (
                    <Button backgroundColor={palette.blue[5]} onClick={onClick}>
                        Search More
                    </Button>
                )}
            </ButtonContainer>
        </>
    );
};

export default SearchPost;
