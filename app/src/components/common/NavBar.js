import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import styled, { css } from 'styled-components';
import { useSelector } from 'react-redux';

import { ButtonOutline, palette, media } from 'styles';
import useWindowSize from 'hooks/useWindowSize';

const Header = styled.header`
    height: 58px;
    border-bottom: 1px solid ${palette.gray[2]};
    background: white;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 25px;
    user-select: none;

    & .fa-bars {
        display: none;
        cursor: pointer;
        right: -28px;
        top: 9px;
        flex-grow: 1;
        text-align: right;
        color: ${palette.gray[5]};

        ${media.tablet`
            display: inline;
        `};
    }
`;

const TitleContainer = styled.div`
    margin-right: 14px;
`;

const Title = styled(Link)`
    font-size: 24px;
    color: ${palette.gray[8]};
    margin-right: 16px;

    ${media.tablet`
        font-size: 22px;
    `};
`;

const InputContainer = styled.div`
    position: relative;

    & .fa-search {
        color: ${palette.gray[3]};
        position: absolute;
        top: 8px;
        left: 12px;
    }
`;

const Input = styled.input`
    cursor: text;
    color: ${palette.gray[7]};
    width: 88%;
    height: 32px;
    border: 1px solid ${palette.gray[4]};
    border-radius: 32px;
    outline: none;
    padding: 2px 14px 2px 36px;
    font-size: 16px;
    margin-right: 10px;

    ${media.tablet`
        width: 86%;
    `};
`;

const InfoButton = styled.div`
    display: inline;
    position: relative;

    & .fa-info-circle {
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
        z-index: 9999;

        &::after {
            content: ' ';
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

    ${media.tablet`
        display: none;
    `};
`;

const NavContainer = styled.nav`
    flex-grow: 1;
    display: flex;
    justify-content: flex-end;

    & .fa-times {
        cursor: pointer;
        position: absolute;
        right: 27px;
        top: 20px;
        text-align: right;
        color: ${palette.gray[5]};
        user-select: none;
    }

    ${media.tablet`
        display: none;
        padding: 40px;
        position: fixed;
        left: 0;
        top: 0;
        width: 100%;
        height: 100%;
        background: ${palette.gray[7]};
        z-index: 999;
        overflow-y: scroll;
        text-align: center;

        ${props =>
            props.isMenuOpen &&
            css`
                display: block;
            `}
    `};
`;

const NavItem = styled(NavLink)`
    font-weight: 300;
    color: ${palette.gray[7]};
    font-size: 18px;
    margin-left: 19px;
    display: inline-block;
    line-height: 57px;
    padding: 0 4px;
    display: block;

    &.active {
        border-bottom: 3px solid ${palette.gray[3]};

        ${media.tablet`
            border-bottom: none;
            font-weight: bold;

        `}
    }

    @media (hover: hover) {
        &:not(.active):hover {
            color: ${palette.gray[5]};
        }
    }

    ${media.tablet`
        color: ${palette.gray[3]};
        margin-left: 0;
        margin-top: 20px;
    `}
`;

const NavBar = ({ history }) => {
    const auth = useSelector(state => state.auth);
    const [width] = useWindowSize();
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [value, setValue] = useState('');

    const navItems = useMemo(() => {
        return [
            { name: 'Home', path: '/', loginRequired: false },
            { name: 'Add Post', path: '/post/new', loginRequired: true, button: true },
            { name: 'Favourites', path: `/user/${auth.userId}/favourites`, loginRequired: true },
            {
                name: 'Profile',
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

    const onClick = useCallback(() => {
        setMenuOpen(isMenuOpen => !isMenuOpen);
    }, [setMenuOpen, isMenuOpen]);

    useEffect(() => {
        document.body.style.overflow = isMenuOpen ? 'hidden' : 'initial';
    }, [isMenuOpen]);

    useEffect(() => {
        const isTablet = width < 768;

        if (!isTablet) setMenuOpen(false);
    }, [width]);

    return (
        <>
            <Header isMenuOpen={isMenuOpen}>
                <Title to="/">Blog</Title>
                <TitleContainer>
                    <InputContainer>
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
                    </InputContainer>
                </TitleContainer>
                <i className="fas fa-bars fa-lg" onClick={onClick} />
                <NavContainer isMenuOpen={isMenuOpen}>
                    {isMenuOpen && <i className="fas fa-times fa-lg" onClick={onClick} />}
                    {navItems
                        .filter(i => (auth.token ? i.loginRequired : !i.loginRequired))
                        .map(i =>
                            i.button ? (
                                <div style={{ alignSelf: 'center' }}>
                                    <Link key={i.name} to={i.path}>
                                        <ButtonOutline>{i.name}</ButtonOutline>
                                    </Link>
                                </div>
                            ) : (
                                <NavItem key={i.name} exact to={i.path} activeClassName="active">
                                    <span>{i.name}</span>
                                </NavItem>
                            )
                        )}
                </NavContainer>
            </Header>
        </>
    );
};

export default withRouter(NavBar);
