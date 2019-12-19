import React from 'react';
import Helmet from 'react-helmet';

import PageTemplate from 'components/common/PageTemplate';
import Editor from 'components/post/Editor';

const EditorPage = ({ location }) => {
    return (
        <PageTemplate>
            <Helmet>
                <title>{location.state ? 'Edit Post' : 'New Post'}</title>
            </Helmet>
            {location.state ? (
                <Editor
                    title={location.state.title}
                    content={location.state.content}
                    id={parseInt(location.state.id)}
                    editor
                />
            ) : (
                <Editor editor={false} />
            )}
        </PageTemplate>
    );
};

export default EditorPage;
