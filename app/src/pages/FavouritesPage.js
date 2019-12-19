import React from 'react';
import qs from 'qs';

import PageTemplate from 'components/common/PageTemplate';
import Favourites from 'components/post/Favourites';

const FavouritesPage = ({ match, location }) => {
    const query = qs.parse(location.search, { ignoreQueryPrefix: true });
    const { id } = match.params;

    return (
        <PageTemplate>
            <Favourites id={parseInt(id)} page={query.page} />
        </PageTemplate>
    );
};

export default FavouritesPage;
