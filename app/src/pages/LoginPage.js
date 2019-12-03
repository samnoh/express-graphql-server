import React from 'react';
import { Link } from 'react-router-dom';

import AuthTemplate from 'components/auth/AuthTemplate';
import AuthForm from 'components/auth/AuthForm';

const imageMeta = {
    imageUrl:
        'https://images.unsplash.com/photo-1492551557933-34265f7af79e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2550&q=80',
    authorUrl: 'https://unsplash.com/@stanleydai',
    author: '@stanleydai'
};

const LoginPage = () => {
    return (
        <AuthTemplate
            title="Sign in to S53 Blog"
            message={
                <>
                    Not a member? <Link to="/signup">Sign up now</Link>
                </>
            }
            image={imageMeta}>
            <AuthForm mode="signin" />
        </AuthTemplate>
    );
};

export default LoginPage;
