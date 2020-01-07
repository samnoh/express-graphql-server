const now = new Date().getTime();

export const capitalize = text => {
    const [firstLetter, ...rest] = text;
    return firstLetter.toUpperCase() + rest.join('');
};

// plurize(2, 'mango', ',es') -> two mangoes
export const plurize = (number, text, option) => {
    const [single, plural] = option ? option.split(',') : [];
    return parseInt(number) === 1 ? text + (single ? single : '') : text + (plural ? plural : 's');
};

export const getTime = time => {
    const _time = parseInt(time);
    const date = new Date(_time);
    const diff = now - _time;

    if (diff <= 60000) {
        // less than a second
        let seconds = parseInt(diff / 1000);
        if (seconds < 0) seconds = 0;
        return `${seconds} ${plurize(seconds, ' second')} ago`;
    } else if (diff <= 3600000) {
        // less than a minute
        const minutes = parseInt(diff / 60000);
        return `${minutes} ${plurize(minutes, ' minute')} ago`;
    } else if (diff <= 86400000) {
        // less than a hour
        const hours = parseInt(diff / 3600000);
        return `${hours} ${plurize(hours, ' hour')} ago`;
    }
    return date.toLocaleDateString('en');
};
