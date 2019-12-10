import React from 'react';
import qs from 'qs';

import PageTemplate from 'components/common/PageTemplate';
import Posts from 'components/post/Posts';

const PostsPage = ({ location }) => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });

    return (
        <PageTemplate>
            <Posts page={query.page} />
        </PageTemplate>
    );
};

export default PostsPage;
