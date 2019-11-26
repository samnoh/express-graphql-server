const root = {
    hello: () => 'Hello world!',
    quoteOfTheDay: () => (Math.random() < 0.5 ? 'Take it easy' : 'Salvation lies within'),
    random: () => Math.random(),
    rollThreeDice: () => [...Array(3)].map(() => 1 + Math.floor(Math.random() * 6))
};

export default root;
