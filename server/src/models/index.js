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

db.User.hasMany(db.Post, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    }
});
db.Post.belongsTo(db.User, {
    onDelete: 'CASCADE',
    hooks: true
});
db.User.hasMany(db.Comment, {
    foreignKey: {
        name: 'userId',
        allowNull: false
    }
});
db.Comment.belongsTo(db.User, {
    onDelete: 'CASCADE',
    hooks: true
});
db.Post.hasMany(db.Comment, {
    foreignKey: {
        name: 'postId',
        allowNull: false
    }
});
db.Comment.belongsTo(db.Post, {
    onDelete: 'CASCADE',
    hooks: true
});
export default db;
