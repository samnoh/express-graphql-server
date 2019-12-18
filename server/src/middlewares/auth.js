import { AuthenticationError } from 'apollo-server-express';
import jwt from 'jsonwebtoken';

import db from 'models';
import { JWT_SECRET_KEY } from 'config/secret';

const { User } = db;

const verifyAuth = ({ req }) => {
    const { authorization } = req.headers;

    if (!authorization) return { cookies: req.cookies };

    const token = authorization.replace('Bearer ', '');

    return jwt.verify(token, JWT_SECRET_KEY, async (error, payload) => {
        if (error) {
            throw new AuthenticationError('Your token is invalid');
        }

        const user = await User.findByPk(payload.userId);

        if (!user) {
            throw new AuthenticationError('Your token is invalid');
        }

        return { user, cookies: req.cookies };
    });
};

export default verifyAuth;
