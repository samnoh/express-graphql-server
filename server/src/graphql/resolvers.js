import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

import db from 'models';
import { JWT_SECRET_KEY } from 'config/secret';

const { User, Post, Comment, Favourite } = db;

const isLoggedIn = context => {
    if (!context.user) {
        throw new AuthenticationError('You must be logged in');
    }
};

const resolvers = {
    Query: {
        checkToken: async (_, __, context) => {
            isLoggedIn(context);

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
            const post = await Post.findByPk(id, {
                include: [{ model: User, as: 'user' }]
            });
            const comment = await Comment.findAll({
                where: { postId: id },
                include: [{ model: User, as: 'user' }]
            });
            post.comment = comment;
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
        postsCount: async (_, { id: userId }) => {
            if (!userId) {
                return await Post.count({});
            }
            return await Post.count({ where: { userId } });
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
        comments: async (_, { id: userId }) => {
            const comments = await Comment.findAll({
                limit: 5,
                where: { userId },
                include: [{ model: User, as: 'user' }],
                order: [['createdAt', 'DESC']]
            });
            return comments;
        },
        commentsCount: async (_, { id: userId }) => {
            return await Comment.count({ where: { userId } });
        },
        favourite: async (_, { id: postId }, context) => {
            isLoggedIn(context);

            const comments = await Favourite.findOne({
                where: { postId, userId: context.user.id }
            });

            return comments ? true : false;
        },
        favourites: async (_, { id: userId, pagination: { offset, limit = 5 } = {} }, context) => {
            isLoggedIn(context);

            if (context.user.id !== userId) {
                throw new AuthenticationError('No Authorization');
            }

            const favourites = await Favourite.findAll({
                limit,
                offset,
                where: { userId },
                include: [{ model: Post, as: 'post' }],
                order: [['createdAt', 'DESC']]
            });

            return favourites;
        },
        favouritesCount: async (_, { id: userId }) => {
            const total = await Favourite.count({ where: { userId } });
            return total;
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

            return jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET_KEY, {
                expiresIn: '10d'
            });
        },
        login: async (_, { user: { username, password } }, context) => {
            const user = context.user || (await User.findOne({ where: { username } }));

            if (!user || user.username !== username) {
                throw new AuthenticationError('The user does not exist');
            }

            try {
                await user.comparePassword(password);
                return jwt.sign({ userId: user.id, username: user.username }, JWT_SECRET_KEY, {
                    expiresIn: '10d'
                });
            } catch (error) {
                throw new AuthenticationError(error || 'The password is invalid');
            }
        },
        addPost: async (_, { title, content }, context) => {
            isLoggedIn(context);

            const post = await Post.create({
                title,
                content,
                userId: context.user.id
            });
            return post;
        },
        editPost: async (_, { id, title, content }, context) => {
            isLoggedIn(context);

            const post = Post.findOne({ where: { id, userId: context.user.id } });

            if (!post) {
                throw new AuthenticationError('The request was not successful');
            }

            const [updated] = await Post.update(
                { title, content },
                { where: { id, userId: context.user.id } }
            );

            if (!updated) {
                throw new AuthenticationError('The request was not successful');
            }

            const updatedPost = await Post.findOne({
                where: { id },
                include: [{ model: User, as: 'user' }]
            });
            return updatedPost;
        },
        deletePost: async (_, { id }, context) => {
            isLoggedIn(context);

            const deleted = await Post.destroy({ where: { id, userId: context.user.id } });

            if (!deleted) {
                throw new AuthenticationError('The request was not successful');
            }
            return true;
        },
        addComment: async (_, { id: postId, content }, context) => {
            isLoggedIn(context);

            try {
                await Comment.create({
                    content,
                    postId,
                    userId: context.user.id
                });
                return true;
            } catch (error) {
                console.error(error);
                return false;
            }
        },
        editComment: async (_, { id, content }, context) => {
            isLoggedIn(context);

            const [updated] = await Comment.update(
                { content },
                { where: { id, userId: context.user.id } }
            );

            return updated ? true : false;
        },
        deleteComment: async (_, { id }, context) => {
            isLoggedIn(context);

            const deleted = await Comment.destroy({ where: { id, userId: context.user.id } });

            if (!deleted) {
                throw new AuthenticationError('The request was not successful');
            }
            return true;
        },
        addFavourite: async (_, { id }, context) => {
            isLoggedIn(context);

            const [favourite, created] = await Favourite.findOrCreate({
                where: { postId: id, userId: context.user.id }
            });

            if (!created) {
                throw new AuthenticationError('The favourite already exists in your list');
            }
            return true;
        },
        deleteFavourite: async (_, { id }, context) => {
            isLoggedIn(context);

            const deleted = await Favourite.destroy({
                where: { postId: id, userId: context.user.id }
            });

            if (!deleted) {
                throw new AuthenticationError('The request was not successful');
            }
            return true;
        }
    }
};

export default resolvers;
