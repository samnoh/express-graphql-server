import React, { useRef, useEffect } from 'react';
import lottie from 'lottie-web';
import loader from 'assets/loader.json';
import styled from 'styled-components';

const Container = styled.div`
    padding-top: 200px;
    display: flex;
    justify-content: center;
`;

const Loader = styled.div`
    width: 300px;
`;

const LoadingPage = () => {
    const item = useRef(null);

    useEffect(() => {
        lottie.loadAnimation({
            container: item.current,
            renderer: 'svg',
            loop: true,
            autoplay: true,
            animationData: loader // https://lottiefiles.com/201-simple-loader
        });
        lottie.setSpeed(0.67);
    }, []);

    return (
        <Container>
            <Loader ref={item}></Loader>
        </Container>
    );
};

export default LoadingPage;
