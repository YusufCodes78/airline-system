import { Schema, model } from 'mongoose';

const PassengerSchema = new Schema({
  name: { type: String, required: true },
  passportNumber: { type: String, required: true },
  address: { type: String, required: true },
  dateOfBirth: { type: Date, required: true },
  seatNumber: { type: String, required: true },
  flightId: { type: Schema.Types.ObjectId, ref: 'Flight', required: true },
  checkedIn: { type: Boolean, default: false },
  requiresWheelchair: { type: Boolean, default: false },
  hasInfant: { type: Boolean, default: false },
  specialMeal: { type: String, default: '' },
  ancillaryServices: [{ type: Schema.Types.ObjectId, ref: 'AncillaryService' }],
  inFlightShopRequests: [{ type: Schema.Types.ObjectId, ref: 'InFlightShopItem' }],
});

export default model('Passenger', PassengerSchema);
