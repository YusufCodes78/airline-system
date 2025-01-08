import express from 'express';
import Passenger from 'shared/src/models/Passenger';
import Flight from 'shared/src/models/Flight';

const router = express.Router();

const passengers = [
  {
    name: 'John Doe',
    passportNumber: 'A1234567',
    address: 'New York, USA',
    dateOfBirth: new Date('2001-01-01'),
    seatNumber: 'A1',
    flightId: null,
  },
  {
    name: 'Jane Smith',
    passportNumber: 'B7654321',
    address: 'New York, USA',
    dateOfBirth: new Date('2001-01-01'),
    seatNumber: 'A2',
    flightId: null,
  },
];

// Endpoint to store dummy passengers in the first flight
router.post('/passengers/store', async (req, res) => {
  try {
    // Find the first flight
    const flight = await Flight.findOne();
    if (!flight) {
      throw new Error('No flights available. Create a flight first.');
    }

    // Assign the flight ID to the dummy passengers
    passengers.forEach((passenger:any) => {
      passenger.flightId = flight._id;
    });

    // Insert dummy passengers
    const passengersModel = await Passenger.insertMany(passengers);
    res.status(200).send(passengersModel);
    console.log('Dummy passengers created');
  } catch (err:any) {
    console.error('Error creating dummy passengers:', err);
    res.status(400).send({ error: err.message });
  }
});

export default router;
