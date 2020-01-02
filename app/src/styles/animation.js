import { keyframes } from 'styled-components';

export const rotate360deg = keyframes`
    from {
        transform: rotate(0deg);
    }
    to {
        transform: rotate(360deg);
    }
`;

export const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

export const moveUp = keyframes`
    from {
        transform: translateY(70px);
    }
    to {
        transform: translateY(0);
    }
`;
