import Sequelize from 'sequelize';

import cf from 'config/config.json';
import { NODE_ENV } from 'config/secret';
import User from './user';
import Post from './post';

const config = cf[NODE_ENV];

const sequelize = new Sequelize(config);

const models = {
    User: User.init(sequelize, Sequelize),
    Post: Post.init(sequelize, Sequelize)
};

const db = {
    ...models,
    sequelize
};

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

export default db;
