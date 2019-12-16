import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

import db from 'models';
import { JWT_SECRET_KEY } from 'config/secret';

const { User, Post, Comment } = db;

const resolvers = {
    Query: {
        checkToken: async (_, __, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in');
            }
            const user = await User.findByPk(context.user.id);
            return user;
        },
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
            const post = await Post.findByPk(id, { include: [{ model: User, as: 'user' }] });
            return post;
        },
        posts: async (_, { pagination: { offset, limit = 20 } = {} }) => {
            if (limit > 100) return null;

            const posts = await Post.findAll({
                offset,
                limit,
                include: [{ model: User, as: 'user' }],
                order: [['createdAt', 'DESC']]
            });
            return posts;
        },
        postsCount: async () => {
            const total = await Post.count({});
            return total;
        },
        postsByUserId: async (_, { id, pagination: { offset, limit = 5 } = {} }) => {
            const posts = await Post.findAll({
                offset,
                limit,
                where: { userId: id },
                include: [{ model: User, as: 'user' }],
                order: [['createdAt', 'DESC']]
            });
            return posts;
        },
        favourites: async () => {},
        comments: async (_, { id: userId }) => {
            const comments = await Comment.findAll({
                limit: 5,
                where: { userId },
                include: [{ model: User, as: 'user' }],
                order: [['createdAt', 'DESC']]
            });
            return comments;
        }
    },
    Mutation: {
        signup: async (_, { user: { username, password, password2 } }) => {
            if (password !== password2) {
                throw new AuthenticationError('Password was not confirmed');
            }

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

            try {
                await user.comparePassword(password);
                return jwt.sign({ userId: user.id }, JWT_SECRET_KEY, { expiresIn: '10d' });
            } catch (error) {
                throw new AuthenticationError(error || 'The password is invalid');
            }
        },
        addPost: async (_, { title, content }, context) => {
            console.log('addPost');
            if (!context.user) {
                throw new AuthenticationError('You must be logged in');
            }

            const post = await Post.create({
                title,
                content,
                userId: context.user.id
            });
            return post;
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
                const updatedPost = await Post.findOne({
                    where: { id },
                    include: [{ model: User, as: 'user' }]
                });
                return updatedPost;
            }

            throw new AuthenticationError('The request was not successful');
        },
        deletePost: async (_, { id }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in');
            }

            const deleted = await Post.destroy({ where: { id } });

            if (deleted) return true;

            throw new AuthenticationError('The request was not successful');
        },
        addComment: async (_, { id: postId, content }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in');
            }

            const comment = await Comment.create({
                content,
                postId,
                userId: context.user.id
            });
            return comment;
        },
        editComment: async (_, { id, content }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in');
            }

            const [updated] = await Comment.update({ content }, { where: { id } });

            if (updated) {
                const updatedComment = await Comment.findOne({
                    where: { id },
                    include: [{ model: User, as: 'user' }]
                });
                return updatedComment;
            }

            throw new AuthenticationError('The request was not successful');
        },
        deleteComment: async (_, { id }, context) => {
            if (!context.user) {
                throw new AuthenticationError('You must be logged in');
            }

            const deleted = await Comment.destroy({ where: { id } });

            if (deleted) return true;

            throw new AuthenticationError('The request was not successful');
        }
    }
};

export default resolvers;
