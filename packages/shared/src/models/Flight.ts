import { Schema, model, Document } from 'mongoose';
import {Flight as FlightType} from '../types/Flight'

export interface FlightDocument extends FlightType, Document{
    id: string;
    flightNumber: string;
    departureTime: Date;
    arrivalTime: Date;
    origin: string;
    destination: string;
    seatMap: {
      seatNumber: string;
      isAvailable: boolean;
      passengerId?: string;
    }[];
}

const FlightSchema = new Schema<FlightDocument>({
    flightNumber: { type: String, required: true },
    departureTime: { type: Date, required: true },
    arrivalTime: { type: Date, required: true },
    origin: { type: String, required: true },
    destination: {type: String, required: true},
    seatMap: [{
        seatNumber: { type: String, required: true },
        isAvailable: { type: Boolean, required: true },
        passengerId: { type: Schema.Types.ObjectId, ref: 'Passenger' }
    }]
});

const Flight = model<FlightDocument>('Flight', FlightSchema);

export default Flight;
