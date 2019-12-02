import React from 'react';
import { NavLink, Link } from 'react-router-dom';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

const navItemList = [
    { name: 'Home', path: '/', loginRequired: false },
    { name: 'Favourites', path: '/favourites', loginRequired: true },
    { name: 'New Post', path: '/post/new', loginRequired: true },
    { name: 'Profile', path: '/profile', loginRequired: true },
    { name: 'Logout', path: '/logout', loginRequired: true },
    { name: 'Login', path: '/login', loginRequired: false }
];

const Header = styled.header`
    height: 58px;
    border-bottom: 1px solid #eaecef;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px;
`;

const Title = styled(Link)`
    font-size: 22px;
    color: #2c3e50;
    margin-right: 30px;
`;

const Input = styled.input`
    cursor: text;
    color: #4e6e8e;
    width: 200px;
    height: 32px;
    margin: 13px 0;
    border: 1px solid #cfd4db;
    border-radius: 32px;
    outline: none;
    padding: 0 15px;
    font-size: 16px;
`;

const NavContainer = styled.nav`
    padding: 0 25px;
    text-align: right;
    flex-grow: 1;
`;

const NavItem = styled(NavLink)`
    font-weight: 300;
    color: #4e6e8e;
    font-size: 17px;
    margin-left: 45px;
    display: inline-block;
    line-height: 57px;
    padding: 0 4px;

    &.active {
        border-bottom: 3px solid #2c3e50;
    }

    @media (hover: hover) {
        &:not(.active):hover {
            color: #a0aec0;
        }
    }
`;

const NavBar = () => {
    const auth = useSelector(state => state.auth);

    return (
        <Header>
            <Title to="/">S53 Blog</Title>
            <NavContainer>
                <Input />
                {navItemList
                    .filter(i => (auth.token ? i.loginRequired : !i.loginRequired))
                    .map(i => (
                        <NavItem key={i.name} exact to={i.path} activeClassName="active">
                            {i.name}
                        </NavItem>
                    ))}
            </NavContainer>
        </Header>
    );
};

export default NavBar;
