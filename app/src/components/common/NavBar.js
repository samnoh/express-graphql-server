import React, { useState, useMemo, useCallback } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import styled from 'styled-components';
import { useSelector } from 'react-redux';

import { ButtonOutline, palette } from 'styles';

const Header = styled.header`
    height: 58px;
    border-bottom: 1px solid ${palette.gray[2]};
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 25px;
    user-select: none;
`;

const Title = styled(Link)`
    font-size: 24px;
    color: ${palette.gray[8]};
    margin-right: 20px;
`;

const Input = styled.input`
    cursor: text;
    color: ${palette.gray[7]};
    width: 240px;
    height: 32px;
    border: 1px solid ${palette.gray[4]};
    border-radius: 32px;
    outline: none;
    padding: 2px 14px 2px 36px;
    font-size: 16px;
    margin-right: 10px;
`;

const TitleContainer = styled.div`
    margin-right: 14px;

    & > i {
        color: ${palette.gray[3]};
        position: relative;
        right: -28px;
    }
`;

const InfoButton = styled.div`
    display: inline;
    position: relative;

    & i {
        cursor: pointer;
        color: ${palette.gray[3]};
    }
    & .popover {
        display: none;
    }

    &:hover .popover {
        display: block;
        position: absolute;
        color: ${palette.gray[2]};
        top: 30px;
        left: -66px;
        background: ${palette.gray[8]};
        width: 150px;
        min-height: 20px;
        opacity: 0.95;
        padding: 10px;
        border-radius: 8px;
        text-align: center;

        &::after {
            content: ' ';
            z-index: 1;
            position: absolute;
            top: -6px;
            left: 67px;
            background: ${palette.gray[8]};
            width: 14px;
            height: 14px;
            opacity: 0.95;
            transform: rotate(45deg);
        }
    }
`;

const NavContainer = styled.nav`
    padding: 0 25px;
    text-align: right;
    flex-grow: 1;
`;

const NavItem = styled(NavLink)`
    font-weight: 300;
    color: ${palette.gray[7]};
    font-size: 18px;
    margin-left: 45px;
    display: inline-block;
    line-height: 57px;
    padding: 0 4px;

    &.active {
        border-bottom: 3px solid ${palette.gray[3]};
    }

    @media (hover: hover) {
        &:not(.active):hover {
            color: ${palette.gray[5]};
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
            if (e.key === 'Enter' && value) {
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
                <InfoButton>
                    <i className="fas fa-info-circle" />
                    <div className="popover">
                        user:username
                        <br />
                        title:keyword
                        <br />
                        content:keyword
                    </div>
                </InfoButton>
            </TitleContainer>
            <NavContainer>
                {navItems
                    .filter(i => (auth.token ? i.loginRequired : !i.loginRequired))
                    .map(i =>
                        i.button ? (
                            <Link key={i.name} to={i.path}>
                                <ButtonOutline>{i.name}</ButtonOutline>
                            </Link>
                        ) : (
                            <NavItem key={i.name} exact to={i.path} activeClassName="active">
                                <span>{i.name}</span>
                            </NavItem>
                        )
                    )}
            </NavContainer>
        </Header>
    );
};

export default withRouter(NavBar);
