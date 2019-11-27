import dotenv from 'dotenv';

dotenv.config();

export const NODE_ENV = process.env.NODE_ENV || 'development';
export const PORT = process.env.PORT || 8000;
export const { JWT_SECRET_KEY } = process.env;

if (!JWT_SECRET_KEY) {
    console.error('Please set environment variables');
    process.exit(1);
}
