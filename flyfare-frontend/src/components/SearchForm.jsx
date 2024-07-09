import { useState } from 'react';
import InputField from './InputField';
import { ResultsCard } from './ResultsCard';

export const SearchForm = () => {
    const [departFrom, setDepartFrom] = useState('');
    const [arriveAt, setArriveAt] = useState('');
    const [departDate, setDepartDate] = useState('');
    const [arriveDate, setArriveDate] = useState('');
    const [searching, setSearching] = useState(false);
    const [flightResults, setFlightResults] = useState([]);
    const [error, setError] = useState('');

    const apiUrl = import.meta.env.VITE_FLYFARE_BACKEND_API_URL;

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (departFrom === arriveAt) {
            setError('Departure and destination cannot be the same.');
            return;
        }
        setSearching(true);
        setError('');

        // API call here
        try {
            const response = await fetch(`${apiUrl}/search`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    departFrom,
                    arriveAt,
                    departDate,
                    arriveDate,
                }),
            });

            if (response.ok) {
                const data = await response.json();
                setFlightResults(data);
            } else {
                console.error('Error fetching flight prices');
                setError('Error fetching prices');
            }
        } catch (error) {
            console.error('Error in handleSubmit: ', error.message);
            setError('An unexpected error occured. Please try again.');
        } finally {
            setSearching(false);
        }
    };
    return (
        <div className="w-screen">
            <div className="mx-auto max-w-4xl">
                {/* Simple heading */}
                <div className="mt-4">
                    <p className="text-xl pb-4 text-center font-semibold">
                        Search For Flights
                    </p>
                </div>
                <div className="p-4 rounded-lg bg-teal-100">
                    {/* form section */}
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="flex space-x-4">
                            <InputField
                                type="text"
                                placeholder="Departure City"
                                value={departFrom}
                                onChange={(e) => setDepartFrom(e.target.value)}
                                required
                            />
                            <InputField
                                type="text"
                                placeholder="Arrival City"
                                value={arriveAt}
                                onChange={(e) => setArriveAt(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex space-x-4">
                            <InputField
                                type="date"
                                value={departDate}
                                onChange={(e) => setDepartDate(e.target.value)}
                            />
                            <InputField
                                type="date"
                                value={arriveDate}
                                onChange={(e) => setArriveDate(e.target.value)}
                            />
                        </div>
                        <div className="flex justify-center">
                            <button
                                type="submit"
                                className="bg-blue-500 rounded-lg px-4 py-2 text-white"
                            >
                                Search
                            </button>
                        </div>
                    </form>
                    {error && (
                        <div className="text-red-600 text-center mt-2">
                            {error}
                        </div>
                    )}
                </div>
                {/* results display section*/}
                <div>
                    {searching ? (
                        <div className="text-center">Loading...</div>
                    ) : (
                        flightResults.map((flight, index) => (
                            <ResultsCard key={index} flights={flight} />
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};
