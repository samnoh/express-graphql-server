import React from 'react';
import qs from 'qs';
import styled from 'styled-components';

import PageTemplate from 'components/common/PageTemplate';
import SearchPost from 'components/post/SearchPost';

const Title = styled.h1`
    margin-bottom: 40px;
`;

const handleOption = query => {
    const prefix = ['title:', 'content:', 'user:', ''];

    let index;
    for (let i = 0; i < prefix.length; i++) {
        if (new RegExp(`^${prefix[i]}`).test(query)) {
            index = i;
            break;
        }
    }
    const regex = new RegExp(`${prefix[index]}`, 'g');
    return { option: prefix[index].slice(0, -1), query: query.replace(regex, '') };
};

const SearchPage = ({ location }) => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    const valid_query = handleOption(query.q);

    return (
        <PageTemplate>
            <Title>
                Result for {valid_query.option ? valid_query.option : 'title'} "{valid_query.query}"
            </Title>
            <SearchPost query={valid_query.query} option={valid_query.option} />
        </PageTemplate>
    );
};

export default SearchPage;
