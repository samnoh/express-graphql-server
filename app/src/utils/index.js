export const capitalize = text => {
    const [firstLetter, ...rest] = text;
    return firstLetter.toUpperCase() + rest.join('');
};

// pluralize(2, 'cherr', 'y,ies') -> cherries
export const pluralize = (number, text, option) => {
    const [single, plural] = option ? option.split(',') : [];
    return parseInt(number) === 1 ? text + (single ? single : '') : text + (plural ? plural : 's');
};

const times = [
    { ms: 1000, unit: 'milliseconds' },
    { ms: 60000, unit: 'second' },
    { ms: 3600000, unit: 'minute' },
    { ms: 86400000, unit: 'hour' },
    { ms: 172800000, unit: 'yesterday' },
    { ms: 259200000, unit: 'two days ago' }
];

export const getTime = time => {
    const _time = parseInt(time),
        diff = new Date().getTime() - _time;

    for (let i = 1; i < times.length; i++) {
        if (diff < times[i].ms) {
            let currTime = parseInt(diff / times[i - 1].ms);
            if (currTime < 0) currTime = 0;
            const unit = times[i].unit;
            return diff < times[3].ms ? `${currTime} ${pluralize(currTime, unit)} ago` : unit;
        }
    }
    return new Date(_time).toLocaleDateString('en');
};
