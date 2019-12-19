import Sequelize from 'sequelize';

import config from 'config/config.json';
import { NODE_ENV } from 'config/secret';
import User from './user';
import Post from './post';
import Comment from './comment';
import Favourite from './favourite';

const _config = config[NODE_ENV];

const sequelize = new Sequelize(_config);

const models = {
    User: User.init(sequelize, Sequelize),
    Post: Post.init(sequelize, Sequelize),
    Comment: Comment.init(sequelize, Sequelize),
    Favourite: Favourite.init(sequelize, Sequelize)
};

const db = {
    ...models,
    sequelize
};

Object.values(models)
    .filter(model => typeof model.associate === 'function')
    .forEach(model => model.associate(models));

export default db;
