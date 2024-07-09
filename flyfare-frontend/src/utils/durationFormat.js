function formatDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?/);
    const hours = match[1] ? match[1].slice(0, -1) : '0';
    const minutes = match[2] ? match[2].slice(0, -1) : '0';

    return `${hours}hrs ${minutes}m`;
}

function timeDateFormat(apiDateString) {
    const match = apiDateString.match(
        /(\d{4})-(\d{2})-(\d{2})T(\d{2}):(\d{2})/,
    );

    const day = match[3];
    const month = match[2];
    const hours = match[4];
    const minutes = match[5];

    return `${day}/${month} ${hours}:${minutes}`;
}

function formatTime(apiDateString) {
    const match = apiDateString.match(/(\d{2}):(\d{2})/);

    const hours = match[1];
    const minutes = match[2];

    return `${hours}:${minutes}`;
}

export { formatDuration, timeDateFormat, formatTime };
