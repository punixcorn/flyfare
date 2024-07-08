function formatDuration(duration) {
    const match = duration.match(/PT(\d+H)?(\d+M)?/);
    const hours = match[1] ? match[1].slice(0, -1) : '0';
    const minutes = match[2] ? match[2].slice(0, -1) : '0';

    return `${hours}hrs ${minutes}m`;
}

export { formatDuration };
