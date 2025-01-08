export interface Passenger {
    id: string;
    name: string;
    passportNumber: string;
    address: string;
    dateOfBirth: Date;
    seatNumber: string;
    flightId: string; // Reference to Flight
    checkedIn: boolean;
    requiresWheelchair: boolean;
    hasInfant: boolean;
    specialMeal: string;
    ancillaryServices: string[]; // Ancillary Service IDs
    inFlightShopRequests: string[]; // Shopping Item IDs
  }
  