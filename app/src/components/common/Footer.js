import React from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    height: 80px;
    background: #fff;
    border-top: 1px solid #eaecef;
    display: flex;
    padding: 28px;
    justify-content: space-between;
    align-items: center;
    font-size: 15px;
    color: #cfd4db;
`;

const Footer = () => {
    return (
        <FooterContainer>
            <a href="https://github.com/samnoh" target="_blank" rel="noopener noreferrer">
                GitHub
            </a>
            <span>© 2019 Sam Noh</span>
        </FooterContainer>
    );
};

export default Footer;
