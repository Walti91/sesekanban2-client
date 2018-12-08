import {Reservation} from "./reservation";
import {Payment} from "./payment";

export class Bill {

  id: number;
  cancelled: boolean;
  reservation: Reservation;

  reservationIds: number[];
  payments: Payment[];
  reminders: String[];
  amount: number;
}
