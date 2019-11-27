import path from 'path';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';
import { importSchema } from 'graphql-import';

import db from 'models';
import { JWT_SECRET_KEY } from 'config/secret';

const { User, Post } = db;

export const typeDefs = importSchema(path.join(__dirname, 'schema.graphql'));

export const resolvers = {
    Query: {
        user: async (_, { id }) => {
            const user = await User.findByPk(id);
            return user;
        },
        users: async (_, __, context) => {
            if (!context.user || context.user.roles !== 'admin') {
                throw new AuthenticationError('You must be admin');
            }

            const users = await User.findAll({});
            return users;
        },
        post: async (_, { id }) => {
            const posts = await Post.findAll({
                where: { userId: id },
                order: [['createdAt', 'DESC']]
            });
            return posts;
        },
        posts: async () => {
            const posts = await Post.findAll({
                order: [['createdAt', 'DESC']]
            });
            return posts;
        }
    },
    Mutation: {
        signUp: async (_, { username, password }) => {
            const [user, created] = await User.findOrCreate({
                where: { username },
                defaults: { password }
            });

            if (!created) {
                throw new AuthenticationError('The username already exists');
            }

            const token = jwt.sign({ userId: user.id }, JWT_SECRET_KEY);
            return token;
        },
        login: async (_, { username, password }, context) => {
            const user = context.user || (await User.findOne({ where: { username } }));

            if (!user || user.username !== username) {
                throw new AuthenticationError('The user does not exist');
            }

            return user
                .comparePassword(password)
                .then(() => jwt.sign({ userId: user.id }, JWT_SECRET_KEY)) // new token
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
        }
    }
};
