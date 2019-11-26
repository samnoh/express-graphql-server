import Sequelize from 'sequelize';

import cf from 'config/config.json';
import user from './user';
import post from './post';

const config = cf[process.env.NODE_ENV || 'development'];

const sequelize = new Sequelize(config);

const db = {};

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.User = user(sequelize, Sequelize);
db.Post = post(sequelize, Sequelize);

db.User.hasMany(db.Post);
db.Post.belongsTo(db.User);

export default db;
