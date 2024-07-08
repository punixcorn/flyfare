const express = require('express');
const dotenv = require('dotenv');
const Amadeus = require('amadeus');
const cors = require('cors');

dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();

app.use(cors());
app.use(express.json());

// Initializing amadeus client
const amadeus = new Amadeus({
    clientId: process.env.AMADEUS_API_KEY,
    clientSecret: process.env.AMADEUS_API_SECRET,
});

// function to get city codes
async function getIATACode(city) {
    try {
        const response = await amadeus.referenceData.locations.get({
            keyword: city,
            subType: Amadeus.location.any,
        });

        if (response.data.length === 0) {
            throw new Error('City not found');
        }

        return response.data[0].iataCode;
    } catch (error) {
        console.error('Error fetching IATA code: ', error);
        throw new Error('Failed to fetch IATA code');
    }
}

app.post('/search', async (req, res) => {
    const { departFrom, arriveAt, departDate, arriveDate } = req.body;

    if (!departFrom || !arriveAt || !departDate || !arriveDate) {
        return res.status(400).send({ error: 'All fields are required.' });
    }

    try {
        console.log('Converting city names to IATA code...');
        const departFromIATA = await getIATACode(departFrom);
        const arriveAtIATA = await getIATACode(arriveAt);

        console.log('Requesting flight data from API...');
        console.log(
            `Origin: ${departFromIATA}, Destination: ${arriveAtIATA}, Depart Data: ${departDate} Arrival Date: ${arriveDate}`,
        );

        const response = await amadeus.shopping.flightOffersSearch.get({
            originLocationCode: departFromIATA,
            destinationLocationCode: arriveAtIATA,
            departureDate: departDate,
            returnDate: arriveDate,
            adults: '1',
        });

        const { dictionaries } = response.result;

        const flightPrices = response.data.map((flight) => {
            const carrierCode = flight.validatingAirlineCodes[0];
            const airlineName = dictionaries.carriers[carrierCode];
            return {
                airline: airlineName,
                duration: flight.itineraries[0].segments[0].duration,
                departTime: flight.itineraries[0].segment[0].departure.at,
                arriveTime: flight.itineraries[0].segment[0].arrival.at,
                price: flight.price.total,
                currency: flight.price.currency,
                stops: flight.itineraries[0].segments[0].numberOfStops,
            };
        });
        console.log(response);

        res.json(flightPrices);
    } catch (error) {
        console.error('Error fetching flight data:', error);
        res.status(500).send({ error: 'Failed to fetch flight data' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
