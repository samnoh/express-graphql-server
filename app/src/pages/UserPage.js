import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import Profile from 'components/user/Profile';

const UserPage = ({ match }) => {
    const { id } = match.params;

    return (
        <PageTemplate>
            <Profile id={parseInt(id)} />
        </PageTemplate>
    );
};

export default UserPage;
