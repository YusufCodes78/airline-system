// backend/src/routes/FlightRouter.ts
import express from 'express';
import Flight from 'shared/src/models/Flight.ts';

const router = express.Router();


// Dummy flight data
const dummyFlights = [
  {
    flightNumber: 'FL123',
    departureTime: new Date('2025-01-10T10:00:00Z'),
    arrivalTime: new Date('2025-01-10T14:00:00Z'),
    origin: 'New York',
    destination: 'London',
    seatMap: Array.from({ length: 10 }, (_, i) => ({
      seatNumber: `A${i + 1}`,
      isAvailable: true,
    })),
  },
  {
    flightNumber: 'FL456',
    departureTime: new Date('2025-01-15T08:00:00Z'),
    arrivalTime: new Date('2025-01-15T12:00:00Z'),
    origin: 'Los Angeles',
    destination: 'Tokyo',
    seatMap: Array.from({ length: 10 }, (_, i) => ({
      seatNumber: `B${i + 1}`,
      isAvailable: true,
    })),
  },
];

// Endpoint to store dummy flights
router.post('/flights/store', async (req, res) => {
  try {
    // console.log(Flight);
    const flights = await Flight.create(dummyFlights[0]);
    res.status(200).send(flights);
    console.log('Dummy flights created');
  } catch (err:any) {
    console.error('Error creating dummy flights:', err);
    res.status(400).send({ error: err.message });
  }
});

export default router;
