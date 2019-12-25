import React, { useState, useMemo, useCallback } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';

import { useSelector } from 'react-redux';

const Header = styled.header`
    height: 58px;
    border-bottom: 1px solid #eaecef;
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px;
    user-select: none;
`;

const Title = styled(Link)`
    font-size: 24px;
    color: #2c3e50;
    margin-right: 6px;
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
    padding: 2px 14px 2px 36px;
    font-size: 16px;
`;

const TitleContainer = styled.div`
    margin-right: 15px;

    & i {
        color: #dcdee0;
        position: relative;
        right: -28px;
    }
`;

const NavContainer = styled.nav`
    padding: 0 25px;
    text-align: right;
    flex-grow: 1;
`;

const NavItem = styled(NavLink)`
    font-weight: 300;
    color: #4e6e8e;
    font-size: 18px;
    margin-left: 45px;
    display: inline-block;
    line-height: 57px;
    padding: 0 4px;

    &.active {
        border-bottom: 3px solid #2c3e50;
    }

    &.button {
        cursor: initial;
    }

    &.button span {
        cursor: pointer;
        line-height: initial;
        background: #61ceb3;
        padding: 7px 18px;
        border-radius: 8px;
        color: #fff;
        border: 1px solid #74ccb6;
    }

    @media (hover: hover) {
        &:not(.active):hover {
            color: #a0aec0;
        }

        & .button:hover {
            opacity: 0.85;
        }
    }
`;

const NavBar = ({ history }) => {
    const auth = useSelector(state => state.auth);
    const [value, setValue] = useState('');

    const navItems = useMemo(() => {
        return [
            { name: 'Home', path: '/', loginRequired: false },
            { name: 'Add Post', path: '/post/new', loginRequired: true, button: true },
            { name: 'Favourites', path: `/user/${auth.userId}/favourites`, loginRequired: true },
            {
                name: `Profile (${auth.username})`,
                path: `/user/${auth.userId}`,
                loginRequired: true
            },
            { name: 'Logout', path: '/logout', loginRequired: true },
            { name: 'Login', path: '/login', loginRequired: false }
        ];
    }, [auth]);

    const onChange = useCallback(e => {
        setValue(e.target.value);
    }, []);

    const onSubmit = useCallback(
        e => {
            if (e.key === 'Enter') {
                history.push(`/search?q=${value}`);
                setValue('');
            }
        },
        [value, history]
    );

    return (
        <Header>
            <Title to="/">S53 Blog</Title>
            <TitleContainer>
                <i className="fas fa-search" />
                <Input value={value} onChange={onChange} onKeyDown={onSubmit} />
            </TitleContainer>
            <NavContainer>
                {navItems
                    .filter(i => (auth.token ? i.loginRequired : !i.loginRequired))
                    .map(i => (
                        <NavItem
                            key={i.name}
                            exact
                            to={i.path}
                            activeClassName={!i.button ? 'active' : ''}
                            className={i.button && 'button'}>
                            <span>{i.name}</span>
                        </NavItem>
                    ))}
            </NavContainer>
        </Header>
    );
};

export default withRouter(NavBar);
