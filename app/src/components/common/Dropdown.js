import React, { useState, useCallback, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';

import { fadeIn, palette } from 'styles';
import { capitalize } from 'utils';

const DropdownButton = styled.div`
    cursor: pointer;
    display: inline-block;
    user-select: none;

    & i {
        color: ${palette.gray[4]};
        vertical-align: text-top;
    }
`;

const DropdownContainer = styled.div`
    position: relative;
    top: 10px;
    width: 150px;
    background: ${palette.gray[8]};
    text-align: center;
    border-radius: 8px;
    color: ${palette.gray[2]};
    opacity: 0.95;
    overflow: hidden;
    z-index: 999;
    animation: ${fadeIn} 0.3s forwards;
`;

const DropdownItem = styled.div`
    cursor: pointer;
    padding: 10px;

    &.active {
        background: ${palette.gray[7]};
    }

    &:hover {
        background: ${palette.gray[6]};
    }
`;

const Dropdown = ({ title, action, list, value }) => {
    const dispatch = useDispatch();
    const [open, setOpen] = useState(false);

    const onClickButton = useCallback(
        e => {
            e.stopPropagation();
            setOpen(open => !open);
        },
        [setOpen]
    );

    const onClickItem = useCallback(
        e => {
            dispatch(action(e.target.dataset.value));
        },
        [dispatch, action]
    );

    useEffect(() => {
        const resetDropdown = () => {
            setOpen(false);
        };

        window.addEventListener('click', resetDropdown);

        return () => {
            window.removeEventListener('click', resetDropdown);
        };
    }, [setOpen]);

    return (
        <>
            <DropdownButton onClick={onClickButton} style={{ marginBottom: '0' }}>
                {title} <i className={`fas fa-chevron-${open ? 'down' : 'right'} fa-lg`}></i>
            </DropdownButton>
            {open && (
                <DropdownContainer>
                    {list.map(l => (
                        <DropdownItem
                            key={l}
                            className={value === l['data-value'] ? 'active' : null}
                            onClick={onClickItem}
                            data-value={l}>
                            {capitalize(l)}
                        </DropdownItem>
                    ))}
                </DropdownContainer>
            )}
        </>
    );
};

export default Dropdown;
