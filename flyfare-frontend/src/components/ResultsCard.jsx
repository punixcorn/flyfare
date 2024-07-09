import { formatDuration, formatTime } from '../utils/durationFormat';

export const ResultsCard = ({ flights }) => {
    return (
        <div className="flex justify-center mt-4">
            <div className="rounded-lg border p-5 shadow-lg w-full max-w-2xl">
                {/* first line */}
                <div className="flex items-center justify-between">
                    <p className="text-lg font-medium">
                        {formatTime(flights.departTime)} -{' '}
                        {formatTime(flights.arriveTime)}
                    </p>
                    <p className="text-sm">
                        {flights.stops} Stop{flights.stops > 1 ? 's' : ''}
                    </p>

                    <p className="text-sm">
                        {formatDuration(flights.duration)}
                    </p>
                </div>
                <div className="flex items-center justify-between mt-4">
                    <p className="font-semibold">{flights.airline}</p>
                    <p className="text-lg font-medium">
                        {flights.currency} {flights.price}
                    </p>

                    <p className="font-light">
                        {flights.departIATACode} - {flights.arriveIATACode}
                    </p>
                </div>
            </div>
        </div>
    );
};
