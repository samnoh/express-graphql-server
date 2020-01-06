import { useState, useEffect } from 'react';

// ref: https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs
const getWindowDimensions = () => {
    const { innerWidth: width, innerHeight: height } = window;

    return [width, height];
};

const useWindowSize = () => {
    const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions);

    useEffect(() => {
        const handleResize = () => setWindowDimensions(getWindowDimensions());
        window.addEventListener('resize', handleResize);
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return windowDimensions;
};
export default useWindowSize;
