import React from 'react';
import qs from 'qs';
import styled from 'styled-components';

import PageTemplate from 'components/common/PageTemplate';
import SearchPost from 'components/post/SearchPost';

const Title = styled.h1`
    margin-bottom: 40px;
`;

const SearchPage = ({ location }) => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    const userSearch = query.q.includes('user:');
    const q = userSearch ? query.q.replace(/user:/g, '') : query.q;

    return (
        <PageTemplate>
            <Title>
                Result for {userSearch && 'user'} "{q}"
            </Title>
            <SearchPost query={q} userSearch={userSearch} />
        </PageTemplate>
    );
};

export default SearchPage;
