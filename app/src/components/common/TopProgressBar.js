import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { palette } from 'styles';

const ProgressBar = styled.progress`
    position: fixed;
    top: 0;
    left: 0;
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    width: 100%;
    height: 4px;
    display: block;
    border: none;
    z-index: 9999;
    color: ${palette.blue[6]};
    background: transparent;
    transition: width 0.3s ease-in-out;

    &::-webkit-progress-bar {
        background: transparent;
    }

    &::-webkit-progress-value {
        transition: width 0.3s ease-in-out;
        background: ${palette.blue[6]};
    }

    &::-moz-progress-bar /* value */ {
        transition: width 0.3s ease-in-out;
        background: ${palette.blue[6]};
    }
`;

const TopProgressBar = () => {
    const [value, setValue] = useState(0);

    useEffect(() => {
        function onScroll() {
            const offsetHeight = document.documentElement.offsetHeight;
            const { scrollY, innerHeight } = window;
            const offsetPercentage = (scrollY / (offsetHeight - innerHeight)) * 100;
            setValue(offsetPercentage);
        }

        window.addEventListener('scroll', onScroll);
        window.addEventListener('resize', onScroll);

        return () => {
            window.removeEventListener('scroll', onScroll);
            window.removeEventListener('resize', onScroll);
        };
    }, []);

    return <ProgressBar max="100" value={value} />;
};

export default TopProgressBar;
