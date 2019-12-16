import Sequelize from 'sequelize';

import config from 'config/config.json';
import { NODE_ENV } from 'config/secret';
import User from './user';
import Post from './post';
import Comment from './comment';

const _config = config[NODE_ENV];

const sequelize = new Sequelize(_config);

const models = {
    User: User.init(sequelize, Sequelize),
    Post: Post.init(sequelize, Sequelize),
    Comment: Comment.init(sequelize, Sequelize)
};

const db = {
    ...models,
    sequelize
};

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);
db.Comment.belongsTo(db.User);
db.Comment.belongsTo(db.Post);

export default db;
