import {Reservation} from './reservation';
import {Payment} from './payment';
import {Reminder} from './reminder';

export class BillDetail {
  id: number;
  cancelled: boolean;
  reservations: Reservation[];
  payments: Payment[];
  reminders: Reminder[];
  discount: number;

  amount: number;
}
