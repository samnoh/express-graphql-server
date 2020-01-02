import styled from 'styled-components';

import palette from './palette';

const button = styled.button`
    cursor: ${props => (props.noHover ? 'initial' : 'pointer')};
    border: none;
    padding: 8px 20px;
    font-size: 16px;
    border-radius: 4px;
    font-weight: 700;
    outline: none;
    user-select: none;

    & + button {
        margin-left: 12px;
    }

    @media (hover: hover) {
        &:hover {
            opacity: ${props => (props.noHover ? 1 : 0.8)};
        }
    }
`;

export const Button = styled(button)`
    color: ${props => props.color || palette.gray[0]};
    background-color: ${props => props.backgroundColor || palette.gray[9]};
`;

export const ButtonOutline = styled(button)`
    color: ${props => props.color || palette.gray[9]};
    border: 1px solid ${props => props.borderColor || palette.gray[9]};
    background-color: ${props => props.backgroundColor || 'transparent'};
`;

export const ButtonInline = styled(button)`
    font-size: 14px;
    padding: 0;
    color: ${props => props.color || palette.gray[9]};
    background-color: transparent;
`;

export const Title = styled.h2`
    font-size: ${props => props.fontSize || '26px'};
    margin-bottom: ${props => props.marginBottom || '50px'};
    color: ${palette.gray[8]};
`;

export const NoItem = styled.div`
    font-size: 20px;
    padding: 40px 0;
    text-align: center;
    color: ${palette.gray[4]};
    user-select: none;
`;
