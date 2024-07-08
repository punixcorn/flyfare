import { formatDuration } from '../utils/durationFormat';

export const ResultsCard = ({ flights }) => {
    return (
        <div>
            <div>
                <p>{flights.airline}</p>
                <p>{formatDuration(flights.duration)}</p>
            </div>
        </div>
    );
};
