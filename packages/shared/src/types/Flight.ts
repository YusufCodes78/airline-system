export interface Flight {
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
  