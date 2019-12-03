import React from 'react';
import { Link } from 'react-router-dom';

import AuthTemplate from 'components/auth/AuthTemplate';
import AuthForm from 'components/auth/AuthForm';

const imageMeta = {
    imageUrl:
        'https://images.unsplash.com/photo-1514845505178-849cebf1a91d?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1534&q=80',
    authorUrl: 'https://unsplash.com/@woutvanacker',
    author: '@woutvanacker'
};

const SignupPage = () => {
    return (
        <AuthTemplate
            title="Sign up to S53 Blog"
            message={
                <>
                    Already a member? <Link to="login">Sign in now</Link>
                </>
            }
            image={imageMeta}>
            <AuthForm signup />
        </AuthTemplate>
    );
};

export default SignupPage;
