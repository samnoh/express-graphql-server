import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import Editor from 'components/post/Editor';

const EditorPage = ({ location }) => {
    return (
        <PageTemplate>
            {location.state ? (
                <Editor
                    title={location.state.title}
                    content={location.state.content}
                    id={location.state.id}
                    editor
                />
            ) : (
                <Editor />
            )}
        </PageTemplate>
    );
};

export default EditorPage;
