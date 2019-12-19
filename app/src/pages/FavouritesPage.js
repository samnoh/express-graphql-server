import React from 'react';

import PageTemplate from 'components/common/PageTemplate';
import Favourites from 'components/post/Favourites';

const FavouritesPage = ({ match }) => {
    const { id } = match.params;

    return (
        <PageTemplate>
            <Favourites id={parseInt(id)} />
        </PageTemplate>
    );
};

export default FavouritesPage;
