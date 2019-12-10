import React, { useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    display: flex;
    width: 400px;
    margin: 0 auto;
    justify-content: space-around;
`;

const PageNum = styled(Link)`
    display: block;
    padding: 10px;
    color: #888;
    user-select: none;

    &.active {
        color: black;
        font-weight: 600;
    }
`;

const Pagination = ({ currPage = 1, total, nPostOnPage }) => {
    const nPagination = 5;
    const counts = parseInt(total / nPostOnPage) + 1;
    const nextPage = useMemo(() => {
        return Math.ceil(currPage / 5) * 5 + 1;
    }, [currPage]);

    const prevPage = useMemo(() => {
        const result = Math.ceil(currPage / 5) * 5 - 9;
        return result <= 0 ? 1 : result;
    }, [currPage]);

    const offset = useMemo(() => {
        return Math.ceil(currPage / 5) * 5 - 5;
    }, [currPage]);

    const onClick = useCallback(() => {
        window.scrollTo(0, 0);
    });

    return (
        <Container>
            {offset > 4 && (
                <>
                    <PageNum to={'?page=1'} onClick={onClick}>
                        {'<<'}
                    </PageNum>
                    <PageNum to={`?page=${prevPage}`} onClick={onClick}>
                        {'<'}
                    </PageNum>
                </>
            )}
            {Array(...Array(counts > nPagination ? nPagination : counts))
                .map((_, i) => i + 1 + offset)
                .map(e => {
                    return e - 1 >= counts ? null : (
                        <PageNum
                            to={`?page=${e}`}
                            onClick={onClick}
                            className={currPage === e && 'active'}>
                            {e}
                        </PageNum>
                    );
                })}
            {nextPage * nPostOnPage - nPostOnPage - total < 0 && (
                <PageNum to={`?page=${nextPage}`} onClick={onClick}>
                    {'>'}
                </PageNum>
            )}
        </Container>
    );
};

export default Pagination;
