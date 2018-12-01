import {Customer} from './customer';
import {RoomReservation} from './room-reservation';

export class Reservation {

  id: number;
  startDate: Date;
  endDate: Date;
  customer: Customer;

  customerId: number;
  roomReservations: RoomReservation[];
}
