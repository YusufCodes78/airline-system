import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import FlightModel, { FlightDocument } from 'shared/src/models/Flight';

export const createFlight = async (flight: FlightDocument) => {
  const newFlight = await FlightModel.create(flight);
  return newFlight;
};

export const findFlight = async (
  filter: FilterQuery<FlightDocument>,
  options: QueryOptions = { lean: true }
) => {
  const flight = await FlightModel.findOne(filter, {}, options);
  return flight;
};

export const getFlights = async (
  filter: FilterQuery<FlightDocument>,
  options: QueryOptions = { lean: true }
) => {
  const flights = await FlightModel.find(filter, {}, options);
  return flights;
};

export const updateFlight = async (
  filter: FilterQuery<FlightDocument>,
  update: UpdateQuery<FlightDocument>,
  options: QueryOptions
) => {
  const flight = await FlightModel.findOneAndUpdate(filter, update, options);
  return flight;
};

export const deleteFlight = async (filter: FilterQuery<FlightDocument>) => {
  const flight = await FlightModel.findOneAndDelete(filter);
  return flight;
}