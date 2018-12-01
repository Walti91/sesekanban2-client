import {Reservation} from "./reservation";

export class Bill {

  id: number;
  cancelled: boolean;
  reservation: Reservation;

  reservationIds: number[];
  payments: String[];
  reminders: String[];
  amount: number;
}
