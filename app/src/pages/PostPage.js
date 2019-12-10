import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import PostDetail from 'components/post/PostDetail';

const PostPage = ({ match }) => {
    const { id } = match.params;

    return (
        <PageTemplate>
            <PostDetail id={parseInt(id)} />
        </PageTemplate>
    );
};

export default PostPage;
