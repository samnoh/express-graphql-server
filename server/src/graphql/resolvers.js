import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

import db from 'models';
import { JWT_SECRET_KEY } from 'config/secret';

const { User, Post } = db;

const resolvers = {
    Query: {
        user: async (_, { id }) => {
            const user = await User.findByPk(id);
            return user;
        },
        users: async (_, { pagination: { offset, limit = 10 } = {} }, context) => {
            if (limit > 100) return null;

            if (!context.user || context.user.roles !== 'admin') {
                throw new AuthenticationError('You must be admin');
            }

            const users = await User.findAll({ offset, limit });
            return users;
        },
        post: async (_, { id }) => {
            const posts = await Post.findAll({
                where: { userId: id },
                order: [['createdAt', 'DESC']]
            });
            return posts;
        },
        posts: async (_, { pagination: { offset, limit = 10 } = {} }) => {
            if (limit > 100) return null;

            const posts = await Post.findAll({
                offset,
                limit,
                include: [{ model: User, as: 'user' }],
                order: [['createdAt', 'DESC']]
            });
            return posts;
        }
    },
    Mutation: {
        signUp: async (_, { user: { username, password } }) => {
            const [user, created] = await User.findOrCreate({
                where: { username },
                defaults: { password }
            });

            if (!created) {
                throw new AuthenticationError('The username already exists');
            }

            return jwt.sign({ userId: user.id }, JWT_SECRET_KEY, { expiresIn: '10d' });
        },
        login: async (_, { user: { username, password } }, context) => {
            const user = context.user || (await User.findOne({ where: { username } }));

            if (!user || user.username !== username) {
                throw new AuthenticationError('The user does not exist');
            }

            return user
                .comparePassword(password)
                .then(() => jwt.sign({ userId: user.id }, JWT_SECRET_KEY, { expiresIn: '10d' }))
                .catch(error => {
                    throw new AuthenticationError(error || 'The password is invalid');
                });
        },
        addPost: async (_, { title, content }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in');
            }

            const post = await Post.create({
                title,
                content,
                userId: context.user.id
            });
            return post.id;
        },
        editPost: async (_, { id, title, content }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in');
            }

            const [updated] = await Post.update(
                { title, content },
                { where: { id, userId: context.user.id } }
            );

            if (updated) {
                const updatedPost = await Post.findOne({ where: { id } });
                return updatedPost;
            }

            throw new AuthenticationError('The request was not successful');
        },
        deletePost: async (_, { id }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in');
            }

            const deleted = await Post.destroy({ where: { id, userId: context.user.id } });

            if (deleted) return true;

            throw new AuthenticationError('The request was not successful');
        }
    }
};

export default resolvers;